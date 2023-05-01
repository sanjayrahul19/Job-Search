import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const userDetails = async (req, res) => {
  try {
    const user = await User.find({})
      .populate("qualifications")
      .select("-password");
    return responseHandler(
      res,
      200,
      "User Details sent Successfully",
      true,
      user
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
