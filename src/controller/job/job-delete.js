import { responseHandler } from "../../response/responseHandler";
import { Job } from "../../model/job";

export const deleteJob = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.findByIdAndDelete(id);
    return responseHandler(res, 200, "Job Deleted Successfully", true, job);
  } catch (error) {
    console.log(error);
    return responseHandler(res, 500, error.message, false);
  }
};
