#include <Arduino.h>
#include "config.h"
#include "network/wifi_manager.h"
#include "network/mqtt_client.h"
#include "sensors/ky015.h"
#include "sensors/ky018.h"
#include "sensors/mq2.h"
#include "sensors/mq135.h"
#include "sensor_node.h"

void setup() {
    Serial.begin(115200);
    wifi_init();

    ky015_init(4);
    ky018_init(34);
    mq2_init(35);
    mq135_init(33);

    mqtt_init(MQTT_CLIENT_ID, MQTT_HOST, MQTT_PORT, MQTT_USER, MQTT_PASS);
}

void loop() {
    mqtt_loop();
    
    float t = ky015_readTemperature();
    float h = ky015_readHumidity();
    int light = ky018_readLight();
    int mq2v = mq2_read();
    int mq135v = mq135_read();
    
    String json = "{";
    json += "\"temp\":" + String(t) + ",";
    json += "\"hum\":" + String(h) + ",";
    json += "\"light\":" + String(light) + ",";
    json += "\"mq2\":" + String(mq2v) + ",";
    json += "\"mq135\":" + String(mq135v);
    json += "}";
    
    mqtt_publish("studybuddy/sensor1/data", json.c_str());
    sensor_node_read();

    delay(1000);
}
