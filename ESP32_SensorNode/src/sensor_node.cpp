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

SensorPacket sensor_node_read() {

    g_data.temperature = ky015_readTemperature();
    g_data.humidity    = ky015_readHumidity();
    g_data.light       = ky018_readLight();
    g_data.mq2         = mq2_read();
    g_data.mq135       = mq135_read();

    // Sound + PIR not implemented yet
    g_data.sound_rms  = 0.0;
    g_data.sound_peak = 0.0;
    g_data.pir        = "idle";

    // Debug print
    Serial.println("------ Sensor Readings ------");
    Serial.printf("Temperature: %.2f°C\n", g_data.temperature);
    Serial.printf("Humidity   : %.2f%%\n", g_data.humidity);
    Serial.printf("Light      : %d\n",     g_data.light);
    Serial.printf("MQ2        : %d\n",     g_data.mq2);
    Serial.printf("MQ135      : %d\n",     g_data.mq135);
    Serial.println("------------------------------\n");

    return g_data;
}
