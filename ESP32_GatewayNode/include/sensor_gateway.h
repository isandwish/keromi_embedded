#pragma once
#include <Arduino.h>

// --------- STRUCT: Data from SensorNode ----------
struct NodeSensor {
    bool valid = false;

    float temp  = 0.0;
    float hum   = 0.0;
    int   light = 0;
    int   mq2   = 0;
    int   mq135 = 0;
};

// --------- STRUCT: Data from Gateway local sensors ----------
struct GatewayLocal {
    bool pir_state = false;

    float sound_rms    = 0.0;
    float sound_avgAbs = 0.0;
    float sound_peak   = 0.0;
};

// --------- API FUNCTIONS ----------
void sensor_gateway_init();
void sensor_gateway_update(const String& topic, const String& jsonMsg);

NodeSensor   sensor_gateway_get_node1();
GatewayLocal sensor_gateway_read_local();
