#include "inmp441.h"
#include <Arduino.h>
#include <driver/i2s.h>
#include <math.h>

#define I2S_PORT I2S_NUM_0
static const int N = 256;   // number of samples per read

void inmp441_init(int bclk, int ws, int sd) {

    i2s_config_t config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = 16000,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT,
        .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = 8,
        .dma_buf_len = 256,
        .use_apll = false,
        .tx_desc_auto_clear = false,
        .fixed_mclk = 0
    };

    i2s_pin_config_t pin_cfg = {
        .bck_io_num = bclk,
        .ws_io_num = ws,
        .data_out_num = -1,
        .data_in_num = sd
    };

    i2s_driver_install(I2S_PORT, &config, 0, NULL);
    i2s_set_pin(I2S_PORT, &pin_cfg);
    i2s_zero_dma_buffer(I2S_PORT);

    Serial.println("[INMP441] Initialized");
}

// -------------- INTERNAL HELPER ---------------

void readSamples(int32_t* buffer) {
    size_t bytesRead;
    i2s_read(I2S_PORT, buffer, sizeof(int32_t) * N, &bytesRead, portMAX_DELAY);

    if (bytesRead == 0) {
        Serial.println("[INMP441] Warning: no data read");
    }
}

// -------------- PUBLIC FEATURES ---------------

float inmp441_getRMS() {
    int32_t samples[N];
    readSamples(samples);

    double sum = 0;
    for (int i = 0; i < N; i++) {
        float s = (samples[i] >> 8) / 8388608.0f;  // Normalize
        sum += s * s;
    }
    return sqrt(sum / N);
}

float inmp441_getAvgAbs() {
    int32_t samples[N];
    readSamples(samples);

    double sum = 0;
    for (int i = 0; i < N; i++) {
        float s = (samples[i] >> 8) / 8388608.0f;
        sum += fabs(s);
    }
    return sum / N;
}

float inmp441_getPeak() {
    int32_t samples[N];
    readSamples(samples);

    float peak = 0.0f;
    for (int i = 0; i < N; i++) {
        float s = fabs((samples[i] >> 8) / 8388608.0f);
        if (s > peak) peak = s;
    }
    return peak;
}
