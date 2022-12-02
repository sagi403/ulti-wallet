import client from "prom-client";

export const updateSwapCoinsHistogramMetrics = new client.Histogram({
  name: "backend_response_time_duration_seconds_swap",
  help: "Transaction swap response time in seconds",
  labelNames: [
    "operation",
    "first_coin_amount",
    "second_coin_amount",
    "old_coin_id",
    "new_coin_id",
  ],
});

export const sendCoinsHistogramMetrics = new client.Histogram({
  name: "backend_response_time_duration_seconds_send",
  help: "Send coins response time in seconds",
  labelNames: ["operation", "coin_id", "sent_amount"],
});
