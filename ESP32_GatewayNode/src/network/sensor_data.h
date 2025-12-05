#ifndef SENSOR_DATA_H
#define SENSOR_DATA_H

#include <Arduino.h>

// Sensor Node values
extern float lastTemp;
extern float lastHum;
extern float lastMQ2;
extern float lastMQ135;
extern float lastLight;

// Gateway sensor values
extern float lastRms;
extern float lastAvgAbs;
extern float lastPeak;
extern String lastPir;

#endif
