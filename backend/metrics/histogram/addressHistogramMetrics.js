import client from "prom-client";

export const createUserAddressHistogramMetrics = new client.Histogram({
  name: "backend_response_time_duration_seconds_create_address",
  help: "Create address response time in seconds",
  labelNames: ["operation", "coin_id"],
});
