#include <Arduino.h>
#include <HTTPClient.h>

#include "sensor_node.h"
#include "config.h"

// Sensors
#include "sensors/ky015.h"
#include "sensors/ky018.h"
#include "sensors/mq2.h"
#include "sensors/mq135.h"
#include "sensors/inmp441.h"
#include "network/wifi_manager.h"

// Global values
float g_temp = 0;
float g_hum = 0;
int g_light = 0;
int g_mq2 = 0;
int g_mq135 = 0;
float g_sound_rms = 0;
float g_sound_avgAbs = 0;
float g_sound_peak = 0;

void sensorNode_init() {
    Serial.println("Initializing sensors...");

    // WiFi
    wifi_init();

    // Sensors
    ky015_init(4);     // DHT11
    ky018_init(34);    // LDR
    mq2_init(35);      // MQ2
    mq135_init(33);    // MQ135

    // ---- INMP441 microphone ----
    // BCLK, WS, SD
    inmp441_init(14, 15, 32);

    Serial.println("Sensor node ready");
}

void sensorNode_readAll() {
    g_temp  = ky015_readTemperature();
    g_hum   = ky015_readHumidity();
    g_light = ky018_readLight();
    g_mq2   = mq2_read();
    g_mq135 = mq135_read();

    // ====== Audio Features for clustering ======
    g_sound_rms    = mic_rms();
    g_sound_avgAbs = mic_avgAbs();
    g_sound_peak   = mic_peak();

    // Debug print
    Serial.println("------ Sensor Data ------");
    Serial.printf("Temp: %.2f °C\n", g_temp);
    Serial.printf("Hum : %.2f %%RH\n", g_hum);
    Serial.printf("Light: %d\n", g_light);
    Serial.printf("MQ2: %d\n", g_mq2);
    Serial.printf("MQ135: %d\n", g_mq135);
    Serial.printf("Mic RMS: %.6f\n", g_sound_rms);
    Serial.printf("Mic AVG: %.6f\n", g_sound_avgAbs);
    Serial.printf("Mic PEAK: %.6f\n", g_sound_peak);
    Serial.println("-------------------------\n");
}