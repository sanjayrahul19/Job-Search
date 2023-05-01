import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id).select("-password");
    return responseHandler(
      res,
      200,
      "User Details deleted Successfully",
      true,
      user
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
