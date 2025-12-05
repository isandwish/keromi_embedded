#include <Arduino.h>
#include "decision_logic.h"
#include "network/sensor_data.h"

unsigned long lastCheck = 0;

void decision_logic_init() {
    Serial.println("Decision logic ready.");
}

void decision_logic_loop() {

    if (millis() - lastCheck < 1000) return;
    lastCheck = millis();

    Serial.println("=== Sensor Data ===");
    Serial.printf("Temp   : %.2f\n", lastTemp);
    Serial.printf("Hum    : %.2f\n", lastHum);
    Serial.printf("MQ-2   : %.2f\n", lastMQ2);
    Serial.printf("MQ-135 : %.2f\n", lastMQ135);
    Serial.printf("Light  : %.2f\n", lastLight);

    Serial.printf("RMS    : %.6f\n", lastRms);
    Serial.printf("AvgAbs : %.6f\n", lastAvgAbs);
    Serial.printf("Peak   : %.6f\n", lastPeak);
    Serial.printf("PIR    : %s\n", lastPir.c_str());

    // ----------- Example logic -----------
    if (lastMQ135 > 900) {
        Serial.println("⚠ High gas detected!");
    }
}
