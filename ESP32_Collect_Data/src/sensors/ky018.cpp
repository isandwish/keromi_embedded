#include "ky018.h"
#include <Arduino.h>

static int ldrPin;

void ky018_init(int pin) {
    ldrPin = pin;
    pinMode(ldrPin, INPUT);
}

int ky018_readLight() {
    return analogRead(ldrPin);
}
