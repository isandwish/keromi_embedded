#ifndef INMP441_H
#define INMP441_H

void inmp441_init(int bclk, int ws, int sd);
float inmp441_read_db();

#endif
