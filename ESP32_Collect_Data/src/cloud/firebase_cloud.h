#ifndef FIREBASE_CLOUD_H
#define FIREBASE_CLOUD_H

void firebase_init();
void firebase_send(
    float temp,
    float hum,
    float mq2,
    float mq135,
    float light,
    String pirStatus,
    float g_sound_rms, 
    float g_sound_avgAbs, 
    float g_sound_peak
);

#endif
