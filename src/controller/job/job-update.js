import { responseHandler } from "../../response/responseHandler";
import { joiJobUpdateSchema, Job } from "../../model/job";

export const updateJob = async (req, res) => {
  try {
    const { error, value } = joiJobUpdateSchema.validate(req.body);
    if (error) {
      return responseHandler(res, 403, error.details[0].message, false);
    } else {
      const id = req.params.id;
      const job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!job || job === null) {
        return responseHandler(res, 400, "Enter a valid Id", false);
      }
      return responseHandler(res, 200, "Job Updated Successfully", true, job);
    }
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
