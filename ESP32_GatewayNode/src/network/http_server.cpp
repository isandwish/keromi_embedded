#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include "cloud/firebase_cloud.h"
#include "cloud/blynk_cloud.h"
#include "http_server.h"
#include "config.h"
#include "sensor_gateway.h"

AsyncWebServer server(GATEWAY_PORT);

// Global received data
float lastTemp = 0;
float lastHum = 0;
float lastMQ2 = 0;
float lastMQ135 = 0;
float lastLight = 0;
float lastRms = 0;
float lastAvgAbs = 0;
float lastPeak = 0;
String lastPir = "unknown";

// -------- SAFE JSON PARSER --------
float safeFloat(String body, String key) {
    int idx = body.indexOf(key);
    if (idx < 0) return 0;   // key not found → return 0 (or keep previous)
    idx += key.length();
    return body.substring(idx).toFloat();
}

void http_server_init() {

    server.on("/sensor", HTTP_POST,
        [](AsyncWebServerRequest *req) {},
        NULL,
        [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {

            String body = String((char*)data).substring(0, len);

            // --- SAFE PARSING ---
            lastTemp   = safeFloat(body, "\"temp\":");
            lastHum    = safeFloat(body, "\"hum\":");
            lastMQ2    = safeFloat(body, "\"mq2\":");
            lastMQ135  = safeFloat(body, "\"mq135\":");
            lastLight  = safeFloat(body, "\"light\":");

            // --- Gateway sensor values ---
            lastRms    = gatewayRms;
            lastAvgAbs = gatewayAvgAbs;
            lastPeak   = gatewayPeak;
            lastPir    = gatewayPir;

            // Optional: delay (non-blocking method)
            // small processing rest to avoid async_tcp overload
            delay(5);

            firebase_send(lastTemp, lastHum, lastMQ2, lastMQ135,
                          lastLight, lastRms, lastAvgAbs, lastPeak, lastPir);

            blynk_send(lastTemp, lastHum, lastMQ2, lastMQ135,
                       lastLight, lastRms, lastAvgAbs, lastPeak, lastPir);

            request->send(200, "application/json", "{\"ok\":true}");
        }
    );

    server.begin();
    Serial.println("HTTP server started.");
}
