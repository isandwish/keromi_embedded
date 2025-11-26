#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>

#include "thingspeak_cloud.h"
#include "config.h"

String ts_key = "";

void thingspeak_init(const char* key) {
    ts_key = String(key);
}

void thingspeak_send_all(
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

    String url =
        "http://api.thingspeak.com/update?api_key=" + ts_key +
        "&field1=" + String(temp) +
        "&field2=" + String(hum) +
        "&field3=" + String(mq2) +
        "&field4=" + String(mq135) +
        "&field5=" + String(light) +
        "&field6=" + String(sound) +
        "&field7=" + pirStatus + 
        "&field8=" + String(timestamp);

    http.begin(url);
    int code = http.GET();

    Serial.print("ThingSpeak Response: ");
    Serial.println(code);

    http.end();
}
