#include "gateway_node.h"
#include "sensor_gateway.h"

void gateway_node_init() {
    sensor_gateway_init();
}

NodeSensor gateway_get_node_sensor() {
    return sensor_gateway_get_node1();
}

GatewayLocal gateway_get_local_sensor() {
    return sensor_gateway_read_local();
}
