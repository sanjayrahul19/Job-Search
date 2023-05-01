import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const userVerify = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById({ _id: userId });
    const otp = req.body.otp;
    if (user.otp === otp) {
      const user = await User.findByIdAndUpdate(
        {
          _id: userId,
        },
        { verified: true },
        { new: true }
      ).select("-password");
      return responseHandler(res, 200, "User Successfully Verified", true,user);
    } else {
      return responseHandler(res, 401, "Incorrect OTP", false);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
