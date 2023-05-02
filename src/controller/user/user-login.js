import { User } from "../../model/user";
import bcrypt from "bcrypt";
import { responseHandler } from "../../response/responseHandler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userLogin = async (req, res) => {
  try {
    let otp = Math.floor(1000 + Math.random() * 9000);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.verified) {
        const password = await bcrypt.compare(req.body.password, user.password);
        if (password) {
          const token = await jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_KEY
          );
          return responseHandler(res, 200, "LoggedIn Successfully", true, {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
          });
        } else {
          return responseHandler(res, 401, "Incorrect password", false);
        }
      } else {
        const updatedOtp = await User.findOneAndUpdate(
          { email: req.body.email },
          { otp: otp },
          { new: true }
        ).select("-password");
        await mailer(updatedOtp, otp);
        return responseHandler(
          res,
          401,
          "Your Not Verified,Check Your Mail And Verify Now",
          false,
          updatedOtp
        );
      }
    } else {
      return responseHandler(res, 404, "User not found", false);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
