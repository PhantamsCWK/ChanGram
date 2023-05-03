import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import logger from "./config/winston.js";

import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import corsOptions from "./config/cors.js";

const app = express();
dotenv.config();

app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use((req, res, next) => {
    logger.log("info", `${req.method} ${req.originalUrl}\t${req.headers.origin}`)

    next()
});

app.use(cookieParser());

app.use("/auth", authRoutes);

app.use("/posts", postsRoutes);
app.use("/user", usersRoutes);


app.get('*', (req, res) => {
    logger.error("error not found");
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    logger.log("error", `${err.name}: ${err.message}\t${req.method} ${req.originalUrl}\t${req.headers.origin}`);

    const status = res.statusCode <= 300 ? 500 : res.statusCode // server error 

    res.status(status)

    res.json({ message: err.message, isError: true })
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running in ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`));