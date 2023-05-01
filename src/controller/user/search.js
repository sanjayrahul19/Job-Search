import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const searchUser = async (req, res) => {
  try {
    const name = req.query.name;
    const designation = req.query.designation;
    if (name) {
      const user = await User.find({
        name: { $regex: `^${name}`, $options: "i" },
      })
        .select("-password")
        .populate("qualifications");
      if (user.length === 0) {
        return responseHandler(res, 400, "No User Found", false);
      }
      return responseHandler(res, 200, "User Found Successfully", true, user);
    }
    if (designation) {
      const user = await User.find({
        current_designation: { $regex: `^${designation}`, $options: "i" },
      })
        .select("-password")
        .populate("qualifications");
      if (user.length === 0) {
        return responseHandler(res, 400, "No User Found", false);
      }
      return responseHandler(res, 200, "User Found Successfully", true, user);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
