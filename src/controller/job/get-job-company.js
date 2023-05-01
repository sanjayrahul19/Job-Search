import { responseHandler } from "../../response/responseHandler";
import { Job } from "../../model/job";

export const getJobCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.find({ company_name: id }).populate("applied_users company_name");
    if (job.length === 0) {
      return responseHandler(res, 400, "No Job Found", false);
    }
    return responseHandler(res, 200, "Job Details Successfully", true, job);
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
