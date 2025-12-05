#ifndef BLYNK_CLOUD_H
#define BLYNK_CLOUD_H

void blynk_init();
void blynk_run();
void blynk_send(
    float temp,
    float hum,
    float mq2,
    float mq135,
    float light,
    float rms,
    float avgAbs,
    float peak,
    String pirStatus
);
#endif
