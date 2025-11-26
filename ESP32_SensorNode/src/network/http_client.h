#ifndef HTTP_CLIENT_H
#define HTTP_CLIENT_H

void http_sendSensorData(
    const char* url,
    float temp, float hum, int light, int mq2, int mq135
);

#endif
