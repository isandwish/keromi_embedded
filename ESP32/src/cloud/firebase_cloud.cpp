#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>

#include "firebase_cloud.h"
#include "config.h" 

void firebase_init() {
    Serial.println("Firebase initialized.");
}

void firebase_send(float t, float h, int light, unsigned long timestamp) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi not connected!");
        return;
    }

    HTTPClient http;

    String url = String(FIREBASE_URL) + "/sensor.json?auth=" + FIREBASE_SECRET;

    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String json =
        "{ \"temperature\": " + String(t) +
        ", \"humidity\": "   + String(h) +
        ", \"light\": "      + String(light) +
        ", \"timestamp\": "  + String(timestamp) +
        " }";

    int code = http.PUT(json);

    Serial.print("Firebase Response: ");
    Serial.println(code);

    http.end();
}
