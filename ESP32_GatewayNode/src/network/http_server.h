#ifndef HTTP_SERVER_H
#define HTTP_SERVER_H

extern float lastTemp;
extern float lastHum;
extern float lastMQ2;
extern float lastMQ135;
extern float lastLight;
extern float lastSound;
extern String lastPir;

void http_server_init();

#endif
