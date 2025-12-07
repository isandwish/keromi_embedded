#include "mqtt_client.h"
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <Arduino.h>
#include "config.h"

WiFiClientSecure espClient;     // IMPORTANT for HiveMQ Cloud TLS
PubSubClient mqtt(espClient);

void mqtt_init(const char* clientID, const char* host, int port, const char* user, const char* pass) {

    espClient.setInsecure();   // disable cert verification (simplest)

    mqtt.setServer(host, port);
}

void mqtt_set_callback(MQTT_CALLBACK_SIGNATURE) {
    mqtt.setCallback(callback);
}

void mqtt_subscribe(const char* topic) {
    mqtt.subscribe(topic);
}

void mqtt_loop() {
    if (mqtt.connected()) {
        mqtt.loop();
        return;
    }

    Serial.print("[MQTT] Connecting... ");

    if (mqtt.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASS)) {
        Serial.println("Connected!");
        mqtt.subscribe(MQTT_TOPIC_SENSOR_SUB);
    } else {
        Serial.printf("Failed, rc=%d\n", mqtt.state());
        delay(2000);
    }
}

void mqtt_publish(const char* topic, const String& payload) {
    mqtt.publish(topic, payload.c_str());
}
