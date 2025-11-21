#include <Arduino.h>
#include <WiFi.h>

#include "config.h"
#include "time_utils.h"
#include "ky018.h"
#include "ky015.h"
#include "firebase_cloud.h"
#include "thingspeak_cloud.h"

void setup() {
    Serial.begin(115200);

    // ---------- WiFi ----------
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi Connected");
    Serial.println(WiFi.localIP());

    // ---------- Time ----------
    initTime();

    // ---------- Sensors ----------
    sensor_ky018_init();
    sensor_ky015_init();

    // ---------- Cloud ----------
    firebase_init();
    thingspeak_init(THINGSPEAK_KEY);

    Serial.println("System Ready!");
}

void loop() {
    // ---------- Read Sensors ----------
    float temperature = sensor_ky015_readTemperature();
    float humidity    = sensor_ky015_readHumidity();
    int lightValue    = sensor_ky018_readLight();

    // ---------- Timestamp ----------
    unsigned long timestamp = getTimestamp();
    String datetimeString   = getDateTimeString();

    // Debug output
    Serial.println("------ SENSOR DATA ------");
    Serial.println(datetimeString);
    Serial.print("Timestamp: "); Serial.println(timestamp);
    Serial.print("Temp: "); Serial.println(temperature);
    Serial.print("Humidity: "); Serial.println(humidity);
    Serial.print("Light: "); Serial.println(lightValue);

    // ---------- SEND TO THINGSPEAK ----------
    thingspeak_send(temperature, humidity, lightValue, timestamp);

    // ---------- SEND TO FIREBASE ----------
    firebase_send(temperature, humidity, lightValue, timestamp);

    Serial.println("-------------------------");
    delay(20000);
}
