import client from "prom-client";

export const authUserHistogramMetrics = new client.Histogram({
  name: "backend_response_time_duration_seconds_login",
  help: "Login response time in seconds",
  labelNames: ["operation", "email"],
});

export const registerUserHistogramMetrics = new client.Histogram({
  name: "backend_response_time_duration_seconds_register",
  help: "Register response time in seconds",
  labelNames: ["operation"],
});
