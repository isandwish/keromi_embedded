#include "mq135.h"

static int MQ135_PIN = -1;
static float prevMQ135 = 0;

void mq135_init(int pin) {
    MQ135_PIN = pin;
    pinMode(MQ135_PIN, INPUT);
}

int mq135_readRaw() {
    if (MQ135_PIN == -1) return -1;
    return analogRead(MQ135_PIN);
}

float mq135_normalize(int raw) {
    return (raw / 4095.0) * 100.0;
}

float mq135_smooth(float raw) {
    const float alpha = 0.2;
    prevMQ135 = alpha * raw + (1 - alpha) * prevMQ135;
    return prevMQ135;
}
