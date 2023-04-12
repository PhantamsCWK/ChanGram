import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", postsRoutes);
app.use("/auth", authRoutes);
app.use("/user", usersRoutes);


app.get('/', (req, res) => {
    res.send('hello');
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running in ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`));