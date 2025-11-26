#include <Arduino.h>
#include "network/wifi_manager.h"
#include "network/http_server.h"
#include "cloud/firebase_cloud.h"
#include "cloud/blynk_cloud.h"
#include "logic/decision_logic.h"

void setup() {
    Serial.begin(115200);
    Serial.println("=== Gateway Booting ===");

    wifi_init();
    http_server_init();
    firebase_init();
    blynk_init();
    decision_logic_init();

    Serial.println("=== Gateway Ready ===");
}

void loop() {
    blynk_run();
    decision_logic_loop();
}
