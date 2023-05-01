import jwt from "jsonwebtoken";
import { responseHandler } from "../response/responseHandler";
import dotenv from "dotenv";

dotenv.config();


export const role = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const data = await jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      req.userId = data.id;
      req.role = data.role;
      next();
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};