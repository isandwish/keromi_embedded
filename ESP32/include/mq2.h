#ifndef MQ2_H
#define MQ2_H

#include <Arduino.h>

void mq2_init(int pin);

// raw reading (0–4095)
int mq2_readRaw();

// normalize (0–100)
float mq2_normalize(int raw);

// smoothing (use raw)
float mq2_smooth(float raw);

#endif
