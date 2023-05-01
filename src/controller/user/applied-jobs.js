import { Job } from "../../model/job";
import { responseHandler } from "../../response/responseHandler";

export const appliedJobs = async (req, res) => {
  try {
    const job = await Job.find({
      applied_users: { $in: req.params.id },
    }).populate("applied_users company_name");
    if (job.length === 0) {
      return responseHandler(res, 400, "No Job Applied", false);
    }
    return responseHandler(
      res,
      200,
      "Applied Jobs Details sent Successfully",
      true,
      job
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
