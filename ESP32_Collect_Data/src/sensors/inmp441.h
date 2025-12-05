#ifndef INMP441_H
#define INMP441_H

void inmp441_init(int bclk, int ws, int sd);

float mic_rms();
float mic_avgAbs();
float mic_peak();

#endif
