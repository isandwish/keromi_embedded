#ifndef KY015_H
#define KY015_H

#include <Arduino.h>

void ky015_init(int pin);

float ky015_readTemperature();
float ky015_readHumidity();

// smoothing
float ky015_smoothTemperature(float raw);
float ky015_smoothHumidity(float raw);

#endif
