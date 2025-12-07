#pragma once
#include <Arduino.h>

void actuator_init(int pin);
void actuator_setTemperature(float temperature);
void actuator_on();
void actuator_off();
bool actuator_isOn();
