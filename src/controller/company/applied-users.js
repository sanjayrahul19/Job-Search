import { Job } from "../../model/job";
import { responseHandler } from "../../response/responseHandler";

export const appliedUsers = async (req, res) => {
  try {
    const appliedUsers = [];
    const company = req.params.id;
    const job = await Job.find().populate("applied_users");
    if (job.length === 0) {
      return responseHandler(res, 400, "There Is No Job Listed", false);
    }
    for (let i = 0; i < job.length; i++) {
      if (
        job[i].company_name.toString() === company &&
        job[i].applied_users.length > 0
      ) {
        appliedUsers.push(job[i]);
      }
    }
    if (appliedUsers.length === 0) {
      return responseHandler(res, 400, "There Is No Applied Users", false);
    }
    return responseHandler(
      res,
      200,
      "Applied Users Sent Successfully",
      true,
      appliedUsers
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
