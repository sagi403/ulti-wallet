import express from "express";
import client from "prom-client";

const app = express();

export const startMetricsServer = () => {
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();

  app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);

    return res.send(await client.register.metrics());
  });

  app.listen(8000, () => {
    console.log("Metrics server started at http://localhost:8000".yellow.bold);
  });
};
