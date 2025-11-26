#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>

#include "firebase_cloud.h"
#include "config.h"

void firebase_init() {
    Serial.println("Firebase initialized.");
}

void firebase_send_all(
    float temp,
    float hum,
    float mq2,
    float mq135,
    float light,
    float sound,
    String pirStatus,
    unsigned long timestamp
) {
    if (WiFi.status() != WL_CONNECTED) return;

    HTTPClient http;

    String url = String(FIREBASE_URL) + "/sensor.json?auth=" + FIREBASE_SECRET;

    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String json =
    "{"
        "\"temperature\": " + String(temp) + ","
        "\"humidity\": "    + String(hum) + ","
        "\"mq2\": "          + String(mq2) + ","
        "\"mq135\": "        + String(mq135) + ","
        "\"light\": "        + String(light) + ","
        "\"sound\": "        + String(sound) + ","
        "\"pir\": \""        + pirStatus + "\","
        "\"timestamp\": "    + String(timestamp) +
    "}";

    int code = http.PUT(json);

    Serial.print("Firebase Response: ");
    Serial.println(code);

    http.end();
}
