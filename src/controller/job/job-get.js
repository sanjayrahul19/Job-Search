import { responseHandler } from "../../response/responseHandler";
import { Job } from "../../model/job";

export const getJob = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findById(id);
    return responseHandler(res, 200, "Job Details Successfully", true, job);
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
