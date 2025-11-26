#ifndef PIR_LOGIC_H
#define PIR_LOGIC_H

#include <Arduino.h>

// PIR Status
enum PirStatus {
    PIR_PRESENT,        // < 30s
    PIR_IDLE,           // 30–60s
    PIR_MAYBE_ABSENT,   // 60–120s
    PIR_ABSENT          // > 120s
};

void pir_logic_init();
PirStatus pir_process(int pirRaw, unsigned long nowSec);
String pir_status_to_string(PirStatus s);

#endif
