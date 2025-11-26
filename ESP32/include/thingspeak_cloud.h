#ifndef THINGSPEAK_CLOUD_H
#define THINGSPEAK_CLOUD_H

#include <Arduino.h>

void thingspeak_init(const char* key);

// sensor + pir status
void thingspeak_send_all(
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
