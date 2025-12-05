#include "time_utils.h"
#include <WiFi.h>
#include <time.h>

static const char* ntpServer = "pool.ntp.org";
static const long gmtOffset_sec = 7 * 3600;     // GMT+7
static const int daylightOffset_sec = 0;

void time_utils_init() {
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
    Serial.print("Syncing time via NTP");

    // wait for time to be set
    int retry = 0;
    while (time(nullptr) < 100000 && retry < 20) {
        Serial.print(".");
        delay(500);
        retry++;
    }

    Serial.println("");

    if (time(nullptr) > 100000)
        Serial.println("Time synced successfully.");
    else
        Serial.println("Time sync failed.");
}

unsigned long get_unix_timestamp() {
    time_t now = time(nullptr);
    return (unsigned long) now;
}

String get_iso8601_time() {
    time_t now = time(nullptr);
    struct tm timeinfo;
    gmtime_r(&now, &timeinfo);

    char buffer[30];
    strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%SZ", &timeinfo);

    return String(buffer);
}
