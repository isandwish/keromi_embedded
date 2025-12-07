#include <Arduino.h>
#include "sensor_node.h"
#include "config.h"

// WiFi
#include "network/wifi_manager.h"

// Sensors
#include "sensors/ky015.h"
#include "sensors/ky018.h"
#include "sensors/mq2.h"
#include "sensors/mq135.h"

// Global data
static SensorPacket g_data;

void sensor_node_init() {
    Serial.println("Initializing Sensor Node...");

    // WiFi
    wifi_init();

    // Sensors
    ky015_init(4);   // DHT11/22 on pin 4
    ky018_init(34);  // LDR on pin 34
    mq2_init(35);    // MQ2 on pin 35
    mq135_init(33);  // MQ135 on pin 33

    Serial.println("Sensor Node ready.");
}