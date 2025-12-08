#include <Arduino.h>
#include <ArduinoJson.h>

#include "config.h"

// Network
#include "network/wifi_manager.h"
#include "network/mqtt_client.h"

// Cloud
#include "cloud/firebase_cloud.h"
#include "cloud/blynk_cloud.h"

// Sensors
#include "sensors/pir.h"
#include "sensors/inmp441.h"

// Logic
#include "logic/decision_logic.h"
#include "logic/pir_logic.h"

// SensorNode (MQTT input)
#include "sensor_gateway.h"

// ---- Shared local values ----
TaskHandle_t micTaskHandle;

float gatewayRms    = 0;
float gatewayPeak   = 0;
float gatewayAvgAbs = 0;

String gatewayPir = "unknown";

// -------------------------------------------------------------
// MIC TASK  (Core 0)
// -------------------------------------------------------------
void micTask(void *param) {
    Serial.println("[micTask] Starting on core 0...");

    inmp441_init(14, 15, 32);
    vTaskDelay(200 / portTICK_PERIOD_MS);

    while (true) {
        gatewayRms    = inmp441_getRMS();
        gatewayAvgAbs = inmp441_getAvgAbs();
        gatewayPeak   = inmp441_getPeak();

        vTaskDelay(10 / portTICK_PERIOD_MS);
    }
}

// -------------------------------------------------------------
// MQTT CALLBACK
// -------------------------------------------------------------
void mqtt_callback(char *topic, byte *payload, unsigned int len) {
    String t = topic;
    String msg;

    for (unsigned int i = 0; i < len; i++)
        msg += (char)payload[i];

    Serial.printf("[MQTT] %s → %s\n", t.c_str(), msg.c_str());
    sensor_gateway_update(t, msg);
}

// -------------------------------------------------------------
// SETUP
// -------------------------------------------------------------
void setup() {
    Serial.begin(115200);
    Serial.println("=== Gateway Booting ===");

    wifi_init();
    decision_logic_init();
    firebase_init();
    blynk_init();

    sensor_gateway_init();

    // MQTT
    mqtt_init(
        MQTT_CLIENT_ID,
        MQTT_HOST,
        MQTT_PORT,
        MQTT_USER,
        MQTT_PASS
    );
    mqtt_set_callback(mqtt_callback);
    mqtt_subscribe(MQTT_TOPIC_SENSOR_SUB);

    // MIC task on core 0
    xTaskCreatePinnedToCore(
        micTask,
        "micTask",
        8192,
        NULL,
        1,
        &micTaskHandle,
        0
    );

    Serial.println("=== Gateway Ready ===");
}

// -------------------------------------------------------------
// LOOP
// -------------------------------------------------------------
void loop() {
    mqtt_loop();
    blynk_run();

    // ---- Local PIR Logic ----
    bool pirNow = pir_read();
    updatePirLogic(pirNow);
    gatewayPir = presenceStatus;

    // ---- Read Local Sensors (mic + pir) ----
    GatewayLocal g = sensor_gateway_read_local();

    // ---- Read SensorNode values (from MQTT) ----
    NodeSensor n1 = sensor_gateway_get_node1();

    // ---- Firebase Upload ----
    firebase_send(
        n1.temp,
        n1.hum,
        n1.mq2,
        n1.mq135,
        n1.light,
        g.sound_rms,
        g.sound_peak,
        g.sound_avgAbs,
        gatewayPir
    );

    blynk_send(
        n1.temp,
        n1.hum,
        n1.mq2,
        n1.mq135,
        n1.light,
        g.sound_rms,
        g.sound_avgAbs,
        g.sound_peak,
        gatewayPir
    );

    // ---- Local Decision Logic ----
    decision_logic_loop();

    delay(2000);
}
