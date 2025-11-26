#include "mq2.h"
#include <Arduino.h>

static int mq2Pin;

void mq2_init(int pin) {
    mq2Pin = pin;
    pinMode(mq2Pin, INPUT);
}

int mq2_read() {
    return analogRead(mq2Pin);
}
