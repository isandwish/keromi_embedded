#ifndef INMP441_H
#define INMP441_H

void inmp441_init(int bclk, int ws, int sd);

float inmp441_getRMS();
float inmp441_getPeak();
float inmp441_getAvgAbs();

#endif
