#include "pir_logic.h"

static unsigned long lastSeenSec = 0;
static PirStatus currentStatus = PIR_PRESENT;

void pir_logic_init() {
    lastSeenSec = 0;
    currentStatus = PIR_PRESENT;
}

PirStatus pir_process(int pirRaw, unsigned long nowSec) {

    // Update last seen motion
    if (pirRaw == 1) {
        lastSeenSec = nowSec;
    }

    unsigned long noHumanSec = nowSec - lastSeenSec;

    // logic presence
    if (noHumanSec < 30) {
        currentStatus = PIR_PRESENT;
    } 
    else if (noHumanSec < 60) {
        currentStatus = PIR_IDLE;
    } 
    else if (noHumanSec < 120) {
        currentStatus = PIR_MAYBE_ABSENT;
    } 
    else {
        currentStatus = PIR_ABSENT;
    }

    return currentStatus;
}

String pir_status_to_string(PirStatus s) {
    switch (s) {
        case PIR_PRESENT:        return "present";
        case PIR_IDLE:           return "idle";
        case PIR_MAYBE_ABSENT:   return "maybe_absent";
        case PIR_ABSENT:         return "absent";
    }
    return "unknown";
}
