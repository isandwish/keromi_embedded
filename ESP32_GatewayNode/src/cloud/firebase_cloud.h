#ifndef FIREBASE_CLOUD_H
#define FIREBASE_CLOUD_H

void firebase_init();
void firebase_send(
    float temp,
    float hum,
    float mq2,
    float mq135,
    float light,
    float sound,
    String pirStatus
);

#endif
