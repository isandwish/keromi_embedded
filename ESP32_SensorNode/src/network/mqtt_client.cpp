#include "mqtt_client.h"
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <Arduino.h>

// IMPORTANT: Use secure client for HiveMQ Cloud
WiFiClientSecure espClient;
PubSubClient mqtt(espClient);

static const char* _clientID;
static const char* _user;
static const char* _pass;

void mqtt_init(
    const char* clientID,
    const char* host,
    int port,
    const char* user,
    const char* pass
) {
    _clientID = clientID;
    _user     = user;
    _pass     = pass;

    // ---- REQUIRED FOR HIVE MQ CLOUD ----
    espClient.setInsecure();   // <-- ADD THIS LINE!

    mqtt.setServer(host, port);

    Serial.println("[MQTT] Initialized (TLS enabled)");
}

static void mqtt_reconnect() {
    while (!mqtt.connected()) {
        Serial.print("[MQTT] Connecting... ");

        if (mqtt.connect(_clientID, _user, _pass)) {
            Serial.println("Connected!");
        } else {
            Serial.printf("Failed, rc=%d. Retrying...\n", mqtt.state());
            delay(2000);
        }
    }
}

void mqtt_loop() {
    if (!mqtt.connected()) {
        mqtt_reconnect();
    }
    mqtt.loop();
}

bool mqtt_publish(const char* topic, const char* payload) {
    return mqtt.publish(topic, payload);
}
