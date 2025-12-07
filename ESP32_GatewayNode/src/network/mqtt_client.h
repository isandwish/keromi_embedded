#pragma once
#include <PubSubClient.h>

void mqtt_init(const char* clientID,
               const char* host,
               int port,
               const char* user,
               const char* pass);

void mqtt_set_callback(MQTT_CALLBACK_SIGNATURE);
void mqtt_subscribe(const char* topic);
void mqtt_publish(const char* topic, const String& payload);
void mqtt_loop();
