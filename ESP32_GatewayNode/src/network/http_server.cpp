#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include "cloud/firebase_cloud.h"
#include "cloud/blynk_cloud.h"
#include "http_server.h"
#include "config.h"
#include "sensors/inmp441.h"
#include "sensors/pir.h"

AsyncWebServer server(GATEWAY_PORT);

float lastTemp = 0;
float lastHum = 0;
float lastMQ2 = 0;
float lastMQ135 = 0;
float lastLight = 0;
float lastSound = 0;
String lastPir = "unknown";

void http_server_init() {

    server.on("/sensor", HTTP_POST,
        [](AsyncWebServerRequest *req){},
        NULL,
        [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {

            String body = String((char*)data).substring(0, len);

            // Manual parsing 
            lastTemp     = body.substring(body.indexOf("\"temp\":") + 7).toFloat();
            lastHum      = body.substring(body.indexOf("\"hum\":") + 6).toFloat();
            lastMQ2      = body.substring(body.indexOf("\"mq2\":") + 6).toFloat();
            lastMQ135    = body.substring(body.indexOf("\"mq135\":") + 8).toFloat();
            lastLight    = body.substring(body.indexOf("\"light\":") + 8).toFloat();
            lastSound    = inmp441_read_db();
            lastPir       = pir_read() ? "present" : "absent";

            firebase_send(lastTemp, lastHum, lastMQ2, lastMQ135, lastLight, lastSound, lastPir);
            blynk_send(lastTemp, lastHum, lastMQ2, lastMQ135, lastLight, lastSound, lastPir);

            request->send(200, "application/json", "{\"ok\":true}");
        }
    );

    server.begin();
    Serial.println("HTTP server started.");
}
