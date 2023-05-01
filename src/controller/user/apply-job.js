import { Job } from "../../model/job";
import { User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";
import { cronJob } from "../node-cron/cron";

export const applyJob = async (req, res) => {
  try {
    let applies = await Job.findById(req.body.job_id);
    const id = req.params.id;
    if (!id || id === null) {
      return responseHandler(res, 400, "Enter a valid Id", false);
    }
    const user = await User.findById(id);
    if (user.premium) {
      if (!applies.applied_users.includes(id)) {
        const job = await Job.findByIdAndUpdate(
          req.body.job_id,
          {
            $push: { applied_users: id },
          },
          { new: true }
        ).populate("applied_users");

        return responseHandler(res, 200, "Applied Job Successfully", true, job);
      } else {
        return responseHandler(res, 400, "Already Applied to this Job", false);
      }
    } else {
      if (user.applied_time >= 10) {
        return responseHandler(
          res,
          400,
          "Reached Maximum Job Apply Limit",
          false
        );
      }
      if (!applies.applied_users.includes(id)) {
        const job = await Job.findByIdAndUpdate(
          req.body.job_id,
          {
            $push: { applied_users: id },
          },
          { new: true }
        )
          .populate({
            path: "applied_users", //field name
            populate: {
              path: "qualifications", //user model field name
              model: "qualification", //model name
            },
          })
          .populate("company_name");

        const user = await User.findByIdAndUpdate(
          id,
          { $inc: { applied_time: 1 } },
          { new: true }
        );
        if (user.applied_time === 10) {
          await cronJob(user._id);
        }
        return responseHandler(res, 200, "Applied Job Successfully", true, job);
      }

      return responseHandler(res, 400, "Already Applied to this Job", false);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
