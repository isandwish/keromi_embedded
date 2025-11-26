#include "mq135.h"
#include <Arduino.h>

static int mq135pin;

void mq135_init(int pin) {
    mq135pin = pin;
    pinMode(mq135pin, INPUT);
}

int mq135_read() {
    return analogRead(mq135pin);
}
