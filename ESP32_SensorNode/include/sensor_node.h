#ifndef SENSOR_NODE_H
#define SENSOR_NODE_H

struct SensorPacket {
    float temperature;
    float humidity;
    float mq2;
    float mq135;
    float light;
    float sound_rms;
    float sound_peak;
    const char* pir;
};

void sensor_node_init();
SensorPacket sensor_node_read();

#endif
