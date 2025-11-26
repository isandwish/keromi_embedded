#include <Arduino.h>
#include "decision_logic.h"
#include "network/http_server.h"

unsigned long lastCheck = 0;

void decision_logic_init() {
    Serial.println("Decision logic ready.");
}

void decision_logic_loop() {

    if (millis() - lastCheck < 2000) return;
    lastCheck = millis();

    Serial.println("=== Sensor Data ===");
    Serial.println("Temp: " + String(lastTemp));
    Serial.println("Hum: " + String(lastHum));
    Serial.println("MQ-2: " + String(lastMQ2));
    Serial.println("MQ-135: " + String(lastMQ135));
    Serial.println("Light: " + String(lastLight));
    Serial.println("Sound: " + String(lastSound));
    Serial.println("PIR: " + lastPir);

    if (lastMQ135 > 900) {
        Serial.println("⚠ High gas detected!");
    }
}
