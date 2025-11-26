#ifndef INMP441_H
#define INMP441_H

#include <Arduino.h>

// init(bclk, lrclk, data)
void inmp441_init(int pin_bclk, int pin_lrclk, int pin_data);
float inmp441_readDB();

#endif
