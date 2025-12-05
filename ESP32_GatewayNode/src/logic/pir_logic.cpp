#include "pir_logic.h"

// === Presence states ===
// "normal"
// "warning_missing"
// "long_absent"
// "critical_absent"
String presenceStatus = "normal";

// Timers
unsigned long lastCheckTime = 0;
unsigned long timeAbsent = 0;
unsigned long timePresent = 0;

void resetPirLogic() {
    timeAbsent = 0;
    timePresent = 0;
    presenceStatus = "normal";
}

// ========================================
//     PIR PRESENCE LOGIC (robust)
// ========================================
void updatePirLogic(bool pirNow) {

    unsigned long now = millis();

    // First-loop guard
    if (lastCheckTime == 0) {
        lastCheckTime = now;
        return;
    }

    unsigned long dt = now - lastCheckTime;
    lastCheckTime = now;

    // ---- UPDATE TIMERS ----
    if (pirNow) {
        timePresent += dt;
        timeAbsent = 0;
    } else {
        timeAbsent += dt;
        timePresent = 0;
    }

    // ---- ABSENT LOGIC ----
    if (!pirNow) {
        if (timeAbsent >= 120000) {                 // 2 minutes
            presenceStatus = "critical_absent";
        }
        else if (timeAbsent >= 60000) {             // 1 minute
            presenceStatus = "long_absent";
        }
        else if (timeAbsent >= 20000) {             // 20 seconds
            presenceStatus = "warning_missing";
        }
    }

    // ---- RETURN LOGIC ----
    if (pirNow) {
        if (timePresent >= 20000) {                 // 20 seconds stable
            presenceStatus = "normal";
        }
    }
}
