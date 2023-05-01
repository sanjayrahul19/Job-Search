import { responseHandler } from "../../response/responseHandler";
import { Job } from "../../model/job";

export const singleJob = async (req, res) => {
  try {
    const job = await Job.create({
      company_name: req.body.company_name,
      job: req.body.job,
      qualifications: req.body.qualifications,
      description: req.body.description,
      experience: req.body.experience,
      salary: req.body.salary,
      date: new Date(req.body.date).setHours(0, 0, 0, 0),
    });
    return responseHandler(res, 200, "Job Created Successfully", true, job);
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
