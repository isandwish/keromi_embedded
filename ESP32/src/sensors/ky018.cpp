#include "ky018.h"

static int LDR_PIN = -1;

void ky018_init(int pin) {
    LDR_PIN = pin;
    pinMode(LDR_PIN, INPUT);
}

int ky018_readRaw() {
    if (LDR_PIN == -1) return -1;
    return analogRead(LDR_PIN);
}
