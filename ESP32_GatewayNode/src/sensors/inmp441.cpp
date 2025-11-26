#include "inmp441.h"
#include <driver/i2s.h>
#include <math.h>

void inmp441_init(int bclk, int ws, int sd) {

    i2s_config_t config = {
        .mode = (i2s_mode_t)(I2S_MODE_MASTER | I2S_MODE_RX),
        .sample_rate = 44100,
        .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT,
        .channel_format = I2S_CHANNEL_FMT_ONLY_LEFT,
        .communication_format = I2S_COMM_FORMAT_STAND_I2S,
        .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
        .dma_buf_count = 4,
        .dma_buf_len = 128
    };

    i2s_pin_config_t pin_cfg = {
        .bck_io_num = bclk,
        .ws_io_num = ws,
        .data_out_num = -1,
        .data_in_num = sd
    };

    i2s_driver_install(I2S_NUM_0, &config, 0, NULL);
    i2s_set_pin(I2S_NUM_0, &pin_cfg);
}

float inmp441_read_db() {
    int32_t samples[128];
    size_t bytes_read;

    i2s_read(I2S_NUM_0, (char *)samples, sizeof(samples), &bytes_read, portMAX_DELAY);

    double sum = 0;
    int count = bytes_read / 4;

    for (int i = 0; i < count; i++) {
        float s = samples[i] / 2147483648.0f;
        sum += s * s;
    }

    float rms = sqrt(sum / count);
    float db = 20.0 * log10(rms + 1e-6);

    return db;
}
