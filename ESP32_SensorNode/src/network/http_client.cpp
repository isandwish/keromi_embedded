#include "http_client.h"
#include <HTTPClient.h>
#include <WiFi.h>

void http_sendSensorData(
    const char* url,
    float temp, float hum, int light, int mq2, int mq135
) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi not connected, cannot send.");
        return;
    }

    HTTPClient http;
    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String json = "{";
    json += "\"temp\":" + String(temp) + ",";
    json += "\"hum\":" + String(hum) + ",";
    json += "\"light\":" + String(light) + ",";
    json += "\"mq2\":" + String(mq2) + ",";
    json += "\"mq135\":" + String(mq135);
    json += "}";

    Serial.println("Sending JSON: " + json);

    int code = http.POST(json);

    if (code > 0) {
        Serial.printf("Gateway [%d]: %s\n", code, http.getString().c_str());
    } else {
        Serial.printf("HTTP Error: %s\n", http.errorToString(code).c_str());
    }

    http.end();
}
