#include "pir.h"
#include <Arduino.h>

static int pirPin = -1;

void pir_init(int pin) {
    pirPin = pin;
    pinMode(pirPin, INPUT);
}

int pir_read() {
    return digitalRead(pirPin);
}
