#include <Arduino.h>
#include "decision_logic.h"
#include "sensor_gateway.h"
#include "actuators/actuator.h"

// จาก main.cpp
extern float gatewayRms;
extern float gatewayPeak;
extern float gatewayAvgAbs;
extern String gatewayPir;

static unsigned long lastCheck = 0;

void decision_logic_init() {
    Serial.println("[Decision] logic ready.");
}

void decision_print_snapshot(const NodeSensor& n1, const GatewayLocal& g) {

    Serial.println("=== Decision Logic Snapshot ===");

    // SensorNode Data
    if (n1.valid) {
        Serial.printf("Temp   : %.2f\n", n1.temp);
        Serial.printf("Hum    : %.2f\n", n1.hum);
        Serial.printf("Light  : %d\n",   n1.light);
        Serial.printf("MQ-2   : %d\n",   n1.mq2);
        Serial.printf("MQ-135 : %d\n",   n1.mq135);
    } else {
        Serial.println("SensorNode: no data yet.");
    }

    // Gateway Local Sensor Data
    Serial.printf("RMS    : %.6f\n", g.sound_rms);
    Serial.printf("AvgAbs : %.6f\n", g.sound_avgAbs);
    Serial.printf("Peak   : %.6f\n", g.sound_peak);
    Serial.printf("PIR    : %s\n", gatewayPir.c_str());
}

void decision_logic_loop() {
    if (millis() - lastCheck < 1000) return;
    lastCheck = millis();

    NodeSensor n1 = sensor_gateway_get_node1();
    GatewayLocal g = sensor_gateway_read_local();

    decision_print_snapshot(n1, g);

    // Example decision
    if (n1.valid && n1.mq135 > 1200) {
        Serial.println("⚠ High gas detected!");
    }

    if (g.sound_peak > 0.2) {
        Serial.println("⚠ High sound peak detected!");
    }

    if (n1.valid) {
        actuator_setTemperature(n1.temp);
    }
}

