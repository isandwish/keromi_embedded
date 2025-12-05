#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include "firebase_cloud.h"
#include "config.h"
#include "utils/time_utils.h"

void firebase_init() {
    Serial.println("Firebase initialized.");
}

String get_compact_timestamp() {
    // Get current time
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        return String(millis());  // fallback
    }

    char buf[32];
    // Format: YYYYMMDDHHMMSS
    strftime(buf, sizeof(buf), "%Y%m%d%H%M%S", &timeinfo);

    // Append milliseconds
    uint32_t ms = millis() % 1000;
    char final_buf[40];
    sprintf(final_buf, "%s%03u", buf, ms);  // → YYYYMMDDHHMMSSmmm

    return String(final_buf);
}

void firebase_send(
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
    if (WiFi.status() != WL_CONNECTED) return;

    HTTPClient http;

    String key = get_compact_timestamp();

    // Firebase URL
    String url = String(FIREBASE_URL) + "/sensor/" + key + ".json?auth=" + FIREBASE_SECRET;

    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    // Optional: ISO8601
    String iso = get_iso8601_time();

    // JSON payload
    String json =
        "{"
            "\"temperature\": " + String(temp) + ","
            "\"humidity\": "    + String(hum) + ","
            "\"light\": "       + String(light) + ","
            "\"mq2\": "         + String(mq2) + ","
            "\"mq135\": "       + String(mq135) + ","
            "\"rms\": "         + String(rms, 6) + ","
            "\"avgAbs\": "      + String(avgAbs, 6) + ","
            "\"peak\": "        + String(peak, 6) + ","
            "\"pir\": \""       + pirStatus + "\","
            "\"timestamp_iso\": \"" + iso + "\""
        "}";

    int code = http.PUT(json);

    Serial.print("Firebase POST Response: ");
    Serial.println(code);

    http.end();
}
