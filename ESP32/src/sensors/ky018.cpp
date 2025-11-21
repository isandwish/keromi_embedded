#include <Arduino.h>
#include "ky018.h"

#define LDR_PIN 34

void sensor_ky018_init() {
    pinMode(LDR_PIN, INPUT);
}

int sensor_ky018_readLight() {
    return analogRead(LDR_PIN);
}
