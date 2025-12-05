#include <Arduino.h>

#include "sensor_node.h"
#include "network/wifi_manager.h"
#include "network/http_client.h"

extern float g_temp, g_hum;
extern int g_light, g_mq2, g_mq135;

static const char* GATEWAY_URL = "http://172.20.10.4/sensor";

void setup() {
    Serial.begin(115200);

    wifi_init();
    sensorNode_init();
}

void loop() {
    sensorNode_readAll();

    http_sendSensorData(
        GATEWAY_URL,
        g_temp, g_hum, g_light, g_mq2, g_mq135
    );

    delay(2000);
}
