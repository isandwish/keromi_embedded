#include <Arduino.h>
#include "sensor_node.h"
#include "network/wifi_manager.h"
#include "cloud/firebase_cloud.h"

extern float g_temp, g_hum;
extern int g_light, g_mq2, g_mq135;
extern float g_sound_rms, g_sound_avgAbs, g_sound_peak;

void setup() {
    Serial.begin(115200);
    delay(500);

    wifi_init();
    firebase_init();
    
    sensorNode_init();

    Serial.println("ESP32 Collect Data Node Ready.");
}

void loop() {

    sensorNode_readAll();

    firebase_send(
        g_temp,
        g_hum,
        g_light,
        g_mq2,
        g_mq135,
        "collect",
        g_sound_rms, 
        g_sound_avgAbs, 
        g_sound_peak
    );

    delay(5000);
}
