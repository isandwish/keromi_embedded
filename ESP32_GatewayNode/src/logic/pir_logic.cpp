#include "pir_logic.h"

String presenceStatus = "normal";

unsigned long lastMotionTime = 0;

// Time thresholds for absence detection
const unsigned long T_WARNING  = 20000;   // 20 seconds
const unsigned long T_LONG     = 60000;   // 60 seconds
const unsigned long T_CRITICAL = 120000;  // 120 seconds

void resetPirLogic() {
    lastMotionTime = millis();
    presenceStatus = "normal";
}

void updatePirLogic(bool pirNow) {
    unsigned long now = millis();

    // Update the last motion timestamp when movement is detected
    if (pirNow) {
        lastMotionTime = now;
    }

    // Calculate how long no movement has been detected
    unsigned long inactive = now - lastMotionTime;

    // Absence classification based on inactivity duration
    if (inactive >= T_CRITICAL) {
        presenceStatus = "critical_absent";
    }
    else if (inactive >= T_LONG) {
        presenceStatus = "long_absent";
    }
    else if (inactive >= T_WARNING) {
        presenceStatus = "warning_missing";
    }
    else {
        // Movement detected within the last 20 seconds → considered normal
        presenceStatus = "normal";
    }
}
