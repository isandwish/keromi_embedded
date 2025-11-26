#ifndef FIREBASE_CLOUD_H
#define FIREBASE_CLOUD_H

#include <Arduino.h>

void firebase_init();

void firebase_send_all(
    float temp,
    float hum,
    float mq2,
    float mq135,
    float light,
    float sound,
    String pirStatus,
    unsigned long timestamp
);

#endif
