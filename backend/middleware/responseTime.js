import responseTime from "response-time";
import { restResponseTimeHistogram } from "../metrics/histogram/histogramMetrics.js";

export const restResponseTimeChecker = responseTime((req, res, time) => {
  if (req?.route?.path) {
    restResponseTimeHistogram.observe(
      {
        method: req.method,
        route: req.route.path,
        status_code: res.statusCode,
      },
      time / 1000
    );
  }
});
