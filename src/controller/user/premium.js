import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const premium = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.findById(id);
    if (users.premium) {
      return responseHandler(res, 400, "User Is Already Premium", false);
    }
    const user = await User.findByIdAndUpdate(
      id,
      { premium: true },
      { new: true }
    )
      .select("-password")
      .populate("qualifications");
    return responseHandler(res, 200, "User Is Premium From Now", true, user);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
