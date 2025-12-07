#ifndef GATEWAY_NODE_CONFIG_H
#define GATEWAY_NODE_CONFIG_H

#include <Arduino.h>

// WiFi
extern const char* WIFI_SSID;
extern const char* WIFI_PASSWORD;

// Firebase
extern const char* FIREBASE_URL;
extern const char* FIREBASE_SECRET;

// Blynk
extern const char* BLYNK_AUTH_TOKEN;

// MQTT
extern const char* MQTT_HOST;
extern const int   MQTT_PORT;
extern const char* MQTT_USER;
extern const char* MQTT_PASS;
extern const char* MQTT_CLIENT_ID;
extern const char* MQTT_TOPIC_SENSOR_SUB; // studybuddy/+/data

#endif
