#include "ky015.h"
#include <DHT.h>

static DHT dhtSensor(0, 0);

void ky015_init(int pin) {
    dhtSensor = DHT(pin, DHT11);
    dhtSensor.begin();
}

float ky015_readTemperature() {
    return dhtSensor.readTemperature();
}

float ky015_readHumidity() {
    return dhtSensor.readHumidity();
}
