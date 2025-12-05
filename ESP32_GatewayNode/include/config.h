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

// Gateway Server
extern const int GATEWAY_PORT;

#endif
