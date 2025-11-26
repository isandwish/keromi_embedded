#include <Arduino.h>
#include <WiFi.h>

// Includes
#include "config.h"
#include "time_utils.h"

#include "ky018.h"
#include "ky015.h"
#include "mq2.h"
#include "mq135.h"
#include "pir.h"
#include "pir_logic.h"
#include "inmp441.h"

void setup() {
    Serial.begin(115200);

    // WiFi
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(400);
        Serial.print(".");
    }
    Serial.println("\nWiFi Connected");
    Serial.println(WiFi.localIP());

    // Time
    initTime();

    // Sensors
    ky018_init(34);  // Light
    ky015_init(4); // Temp + Hum
    mq2_init(35); // Gas
    mq135_init(33); // Air
    pir_init(27); // Motion
    pir_logic_init();
    inmp441_init(14, 15, 32); // Sound

    Serial.println("System Ready!");
}

void loop() {
    // SENSOR READ
    float rawTemp  = ky015_readTemperature();
    float rawHum   = ky015_readHumidity();
    int rawMQ2     = mq2_readRaw();
    int rawMQ135   = mq135_readRaw();
    int rawLight   = ky018_readRaw();
    int pirRaw     = pir_readRaw();
    float dB = inmp441_readDB();

    // PIR LOGIC
    unsigned long nowSec = millis() / 1000;
    PirStatus pirStatusEnum = pir_process(pirRaw, nowSec);
    String pirStatus = pir_status_to_string(pirStatusEnum);

    // TIMESTAMP
    unsigned long timestamp = getTimestamp();

    // DEBUG OUTPUT
    Serial.println("------ SENSOR DATA (SCHEMA FORMAT) ------");

    Serial.print("1 Temp(°C)  : "); Serial.println(rawTemp);
    Serial.print("2 Hum(%RH)  : "); Serial.println(rawHum);
    Serial.print("3 MQ2       : "); Serial.println(rawMQ2);
    Serial.print("4 MQ135     : "); Serial.println(rawMQ135);
    Serial.print("5 Light     : "); Serial.println(rawLight);
    Serial.print("6 Sound(dB) : "); Serial.println(rawLight);
    Serial.print("7 PIR       : "); Serial.println(pirStatus);
    Serial.print("8 Timestamp : "); Serial.println(timestamp);

    Serial.println("------------------------------------------");

    delay(1000);
}
