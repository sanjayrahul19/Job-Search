import { Job } from "../../model/job";
import { responseHandler } from "../../response/responseHandler";

export const appliedJobs = async (req, res) => {
  try {
    const appliedUsers = [];
    const company = req.query.company;
    const jobs = await Job.find().populate("applied_users");
    if (jobs.length === 0) {
      return responseHandler(res, 400, "No job found", false);
    }

    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].company_name.toString() === company) {
        if (
          jobs[i].company_name.toString() === company &&
          jobs[i].applied_users.length > 0
        ) {
          if (
            jobs[i].job === req.query.job &&
            jobs[i].experience === req.query.experience
          ) {
            appliedUsers.push(jobs[i]);
          }
        }
      }
    }

    if (appliedUsers.length === 0) {
      return responseHandler(
        res,
        400,
        "There is No User Applied To This Job",
        false
      );
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
