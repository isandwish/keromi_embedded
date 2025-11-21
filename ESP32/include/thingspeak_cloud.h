#pragma once
#include <Arduino.h>

void thingspeak_init(const char* key);
void thingspeak_send(float temp, float hum, int light, unsigned long timestamp);
