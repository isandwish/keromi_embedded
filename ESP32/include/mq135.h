#ifndef MQ135_H
#define MQ135_H

#include <Arduino.h>

void mq135_init(int pin);

int mq135_readRaw();

float mq135_normalize(int raw);

float mq135_smooth(float raw);

#endif
