#include "config.h"

#define BLYNK_TEMPLATE_ID "TMPL6kkhZJamx"
#define BLYNK_TEMPLATE_NAME "Keromi"

#include <BlynkSimpleEsp32.h>
#include "blynk_cloud.h"

void blynk_init() {
    Blynk.begin(BLYNK_AUTH_TOKEN, WIFI_SSID, WIFI_PASSWORD);
    Serial.println("Blynk connected.");
}

void blynk_run() {
    Blynk.run();
}

void blynk_send(
    float temp,
    float hum,
    float mq2,
    float mq135,
    float light,
    float rms,
    float avgAbs,
    float peak,
    String pirStatus
) {
    Blynk.virtualWrite(V0, temp);
    Blynk.virtualWrite(V1, hum);
    Blynk.virtualWrite(V2, mq2);
    Blynk.virtualWrite(V3, mq135);
    Blynk.virtualWrite(V4, light);
    Blynk.virtualWrite(V5, rms);
    Blynk.virtualWrite(V7, avgAbs);
    Blynk.virtualWrite(V8, peak);
    Blynk.virtualWrite(V6, pirStatus);
}
