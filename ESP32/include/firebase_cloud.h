#pragma once
#include <Arduino.h>

void firebase_init();
void firebase_send(float t, float h, int light, unsigned long timestamp);
