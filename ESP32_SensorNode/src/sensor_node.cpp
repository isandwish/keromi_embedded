#include <Arduino.h>
#include <HTTPClient.h>

#include "sensor_node.h"
#include "config.h"

#include "sensors/ky015.h"
#include "sensors/ky018.h"
#include "sensors/mq2.h"
#include "sensors/mq135.h"
#include "network/wifi_manager.h"

// Global values
float g_temp = 0;
float g_hum = 0;
int g_light = 0;
int g_mq2 = 0;
int g_mq135 = 0;

void sensorNode_init() {
    Serial.println("Initializing sensors...");

    // WiFi
    wifi_init();

    // Sensors
    ky015_init(4);
    ky018_init(34);
    mq2_init(35);
    mq135_init(33);

    Serial.println("Sensor node ready");
}

void sensorNode_readAll() {
    g_temp  = ky015_readTemperature();
    g_hum   = ky015_readHumidity();
    g_light = ky018_readLight();
    g_mq2   = mq2_read();
    g_mq135 = mq135_read();

    Serial.println("------ Sensor Data ------");
    Serial.printf("Temp: %.2f °C\n", g_temp);
    Serial.printf("Hum : %.2f %%RH\n", g_hum);
    Serial.printf("Light: %d\n", g_light);
    Serial.printf("Gas MQ2: %d\n", g_mq2);
    Serial.printf("Air MQ135: %d\n", g_mq135);
    Serial.println("-------------------------\n");
}

void sensorNode_sendAll(String gatewayUrl) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi disconnected, skipping send.");
        return;
    }

    HTTPClient http;
    http.begin(gatewayUrl);
    http.addHeader("Content-Type", "application/json");

    // build JSON
    String json = "{";
    json += "\"temp\":" + String(g_temp) + ",";
    json += "\"hum\":"  + String(g_hum) + ",";
    json += "\"light\":" + String(g_light) + ",";
    json += "\"mq2\":" + String(g_mq2) + ",";
    json += "\"mq135\":" + String(g_mq135);
    json += "}";

    Serial.println("Sending to gateway: " + json);

    int httpCode = http.POST(json);

    if (httpCode > 0) {
        Serial.printf("Gateway [%d]: %s\n",
                      httpCode, http.getString().c_str());
    } else {
        Serial.printf("Send failed: %s\n",
                      http.errorToString(httpCode).c_str());
    }

    http.end();
}
