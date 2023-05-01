import { Qualification } from "../../model/qualification";
import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";

export const deleteQualification = async (req, res) => {
  try {
    const id = req.params.id;
    const qualification = await Qualification.findByIdAndDelete(id);
    if (!qualification || qualification === null) {
      console.log("hi");
      return responseHandler(res, 400, "Enter a valid Id", false);
    }
    const user = await User.findByIdAndUpdate(
      qualification.user,
      { $pull: { qualifications: qualification._id } },
      { new: true }
    ).populate("qualifications");
    console.log(user);

    return responseHandler(
      res,
      200,
      "Qualification deleted Successfully",
      true,
      user
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
