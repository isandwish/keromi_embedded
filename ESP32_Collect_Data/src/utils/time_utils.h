#ifndef TIME_UTILS_H
#define TIME_UTILS_H
#include <Arduino.h>

// init NTP time
void time_utils_init();

// return unix timestamp (seconds)
unsigned long get_unix_timestamp();

// return ISO8601 time string
String get_iso8601_time();
#endif