import express from "express";
const app = express();
const PORT = process.env.PORT;
import { connectDB } from "./config/db";
import { router } from "./router/router";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

dotenv.config();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();

app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is up and running");
});
