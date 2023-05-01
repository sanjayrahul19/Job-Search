import { User } from "../model/user";
import { responseHandler } from "../response/responseHandler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const data = await jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      const user = await User.findById({ _id: data.id });
      if (user.verified) {
        return responseHandler(res, 400, "Already Verified", false);
      } else {
        req.userId = user.id;
        next();
      }
    } else {
      return responseHandler(res, 500, "Access Denied", false);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
