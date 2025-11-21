#include "time_utils.h"
#include <time.h>

void initTime() {
    // GMT+7 (ประเทศไทย)
    configTime(7 * 3600, 0, 
               "pool.ntp.org", 
               "time.nist.gov",
               "asia.pool.ntp.org");

    Serial.print("Syncing time...");
    
    time_t now = time(nullptr);
    while (now < 1700000000) {   // ถ้าน้อยกว่าเวลาปี 2023 แปลว่ายังไม่ได้ sync
        Serial.print(".");
        delay(500);
        now = time(nullptr);
    }

    Serial.println(" Done!");
}

unsigned long getTimestamp() {
    return time(nullptr);
}

String getDateTimeString() {
    time_t now = time(nullptr);
    struct tm timeinfo;
    localtime_r(&now, &timeinfo);

    char buffer[32];
    strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", &timeinfo);

    return String(buffer);
}
