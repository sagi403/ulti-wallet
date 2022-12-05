import express from "express";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import coinRoutes from "./routes/coinRoutes.js";
import cmcRoutes from "./routes/cmcRoutes.js";
import transactionRoute from "./routes/transactionRoutes.js";
import { restResponseTimeChecker } from "./middleware/responseTime.js";

const app = express();

app.use(express.json());

app.use(restResponseTimeChecker);

app.use("/api/users", userRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/coins", coinRoutes);
app.use("/api/cmc", cmcRoutes);
app.use("/api/transaction", transactionRoute);

app.use(notFound);

app.use(errorHandler);

export { app };
