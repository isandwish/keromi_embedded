#include "ky015.h"
#include <DHT.h>

static DHT dhtSensor(0, 0);

static float prevTemp = 0;
static float prevHum = 0;

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

float ky015_smoothTemperature(float raw) {
    const float alpha = 0.3;
    prevTemp = alpha * raw + (1 - alpha) * prevTemp;
    return prevTemp;
}

float ky015_smoothHumidity(float raw) {
    const float alpha = 0.3;
    prevHum = alpha * raw + (1 - alpha) * prevHum;
    return prevHum;
}
