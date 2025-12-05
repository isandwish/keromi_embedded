#include <Arduino.h>
#include "network/wifi_manager.h"
#include "network/http_server.h"
#include "cloud/firebase_cloud.h"
#include "cloud/blynk_cloud.h"
#include "logic/decision_logic.h"
#include "sensors/pir.h"
#include "sensors/inmp441.h"
#include "network/sensor_data.h"
#include "logic/pir_logic.h"

TaskHandle_t micTaskHandle;

// Gateway sensor values (shared global)
float gatewayRms    = 0;
float gatewayAvgAbs = 0;
float gatewayPeak   = 0;
String gatewayPir   = "unknown";

// ---------------- MIC TASK (runs on Core 0) ----------------
void micTask(void *param) {
    Serial.println("[micTask] starting on Core 0...");

    // IMPORTANT: Init I2S on the same core where we read it
    inmp441_init(14, 15, 32);

    vTaskDelay(200 / portTICK_PERIOD_MS);

    while (true) {
        float rms    = mic_rms();
        float avgAbs = mic_avgAbs();
        float peak   = mic_peak();

        gatewayRms    = rms;
        gatewayAvgAbs = avgAbs;
        gatewayPeak   = peak;

        lastRms    = rms;
        lastAvgAbs = avgAbs;
        lastPeak   = peak;

        vTaskDelay(10 / portTICK_PERIOD_MS);  // 100Hz, safe
    }
}
// -----------------------------------------------------------


void setup() {
    Serial.begin(115200);
    Serial.println("=== Gateway Booting ===");

    wifi_init();
    pir_init(27);

    decision_logic_init();
    firebase_init();
    blynk_init();
    // http_server_init();

    // Create microphone task on Core 0
    xTaskCreatePinnedToCore(
        micTask,
        "micTask",
        8192,
        NULL,
        1,
        &micTaskHandle,
        0   // <-- Core 0
    );

    Serial.println("=== Gateway Ready ===");
}

void loop() {
    bool pirNow = pir_read();      // raw
    updatePirLogic(pirNow);        // process logic

    lastPir = presenceStatus;      // logic output (normal / warning / long / critical)
    gatewayPir = presenceStatus;

    blynk_run();
    decision_logic_loop();

    delay(2000);
}
