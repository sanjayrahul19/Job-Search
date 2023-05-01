import { Job } from "../../model/job";
import { User } from "../../model/user";
import { acceptRejectMail } from "../../mailer/accept-reject-mail";
import { responseHandler } from "../../response/responseHandler";

export const acceptReject = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const job = await Job.findById(req.body.jobId).populate(
      "company_name applied_users"
    );
    await acceptRejectMail(req.body, job, user);
    return responseHandler(res, 200, "Mail sent Successfully", true);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
