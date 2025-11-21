#include <Arduino.h>
#include "ky015.h"
#include "DHT.h"

#define DHT_PIN 4
#define DHT_TYPE DHT11

DHT dht(DHT_PIN, DHT_TYPE);

void sensor_ky015_init() {
    dht.begin();
}

float sensor_ky015_readTemperature() {
    return dht.readTemperature();
}

float sensor_ky015_readHumidity() {
    return dht.readHumidity();
}
