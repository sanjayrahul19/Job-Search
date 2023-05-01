import { responseHandler } from "../../response/responseHandler";
import { Job } from "../../model/job";

export const getJobs = async (req, res) => {
  try {
    const job = await Job.find();
    return responseHandler(res, 200, "Job Details Successfully", true, job);
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
