#include "pir.h"

static int PIR_PIN = -1;

void pir_init(int pin) {
    PIR_PIN = pin;
    pinMode(PIR_PIN, INPUT);
}

int pir_readRaw() {
    if (PIR_PIN == -1) return -1;
    return digitalRead(PIR_PIN);  // 1 = motion, 0 = no motion
}
