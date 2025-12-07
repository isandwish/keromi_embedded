#include "sensor_gateway.h"
#include <ArduinoJson.h>
#include <Arduino.h>

#include "sensors/pir.h"
#include "sensors/inmp441.h"
#include "actuators/actuator.h"

// Global state for SensorNode data
static NodeSensor node1;

// ====================== INITIALIZATION ======================
void sensor_gateway_init() {
    pir_init(27);               // PIR GPIO
    inmp441_init(14, 15, 32);   // I2S Mic pins
    actuator_init(12);          // Servo actuator pin

    node1.valid = false;

    Serial.println("[Gateway] sensor_gateway_init() OK");
}

// ====================== MQTT UPDATE (FROM SENSOR NODE) ======================
void sensor_gateway_update(const String& topic, const String& jsonMsg) {
    Serial.println("[Gateway] MQTT received");
    Serial.println(" Topic: " + topic);
    Serial.println(" Data : " + jsonMsg);

    JsonDocument doc;
    DeserializationError err = deserializeJson(doc, jsonMsg);

    if (err) {
        Serial.println("[Gateway] JSON parse FAILED");
        return;
    }

    node1.temp  = doc["temp"]  | 0.0;
    node1.hum   = doc["hum"]   | 0.0;
    node1.light = doc["light"] | 0;
    node1.mq2   = doc["mq2"]   | 0;
    node1.mq135 = doc["mq135"] | 0;

    node1.valid = true;

    Serial.println("[Gateway] NodeSensor updated");
}

// ====================== GET SensorNode DATA ======================
NodeSensor sensor_gateway_get_node1() {
    return node1;
}

// ====================== READ LOCAL SENSORS ======================
GatewayLocal sensor_gateway_read_local() {
    GatewayLocal g;

    g.pir_state    = pir_read();
    g.sound_rms    = inmp441_getRMS();
    g.sound_avgAbs = inmp441_getAvgAbs();
    g.sound_peak   = inmp441_getPeak();

    return g;
}
