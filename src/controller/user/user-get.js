import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const userDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
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
