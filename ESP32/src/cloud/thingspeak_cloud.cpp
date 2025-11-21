#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>

#include "thingspeak_cloud.h"
#include "config.h"

String ts_key = "";  // เก็บ key ที่ส่งมา

void thingspeak_init(const char* key) {
    ts_key = String(key);
}

void thingspeak_send(float temp, float hum, int light, unsigned long timestamp) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi not connected!");
        return;
    }

    HTTPClient http;

    String url = "http://api.thingspeak.com/update?api_key=" + ts_key +
                 "&field1=" + String(temp) +
                 "&field2=" + String(hum) +
                 "&field3=-1" + 
                 "&field4=-1" + 
                 "&field5=" + String(light) +
                 "&field6=" + String(timestamp);

    http.begin(url);
    int code = http.GET();
    Serial.print("ThingSpeak Response: ");
    Serial.println(code);
    http.end();
}
