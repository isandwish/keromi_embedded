#include "mq2.h"

static int MQ2_PIN = -1;
static float prevMQ2 = 0;

void mq2_init(int pin) {
    MQ2_PIN = pin;
    pinMode(MQ2_PIN, INPUT);
}

int mq2_readRaw() {
    if (MQ2_PIN == -1) return -1;
    return analogRead(MQ2_PIN);
}

float mq2_normalize(int raw) {
    return (raw / 4095.0) * 100.0;
}

float mq2_smooth(float raw) {
    const float alpha = 0.2;
    prevMQ2 = alpha * raw + (1 - alpha) * prevMQ2;
    return prevMQ2;
}
