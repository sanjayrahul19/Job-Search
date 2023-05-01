import { Job } from "../../model/job";
import { Company } from "../../model/company";
import { responseHandler } from "../../response/responseHandler";

export const search = async (req, res) => {
  try {
    const jobName = req.query.jobName;
    const companyName = req.query.company;
    let companyId;

    if (companyName) {
      const company = await Company.findOne({ company_name: companyName });
      if (company) {
        companyId = company._id;
      }
    }
    let date;
    let nextDay;
    if (req.query.date) {
      const timeStamp = Date.parse(req.query.date); //converts to milliseconds
      if (!isNaN(timeStamp)) {
        date = new Date(timeStamp);
        date.setUTCHours(0, 0, 0, 0);
        nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        console.log(date);
      }
    }
    const experience = req.query.experience;
    const qualification = req.query.qualification;

    const job = await Job.find({
      $or: [
        {
          job: jobName,
        },
        {
          experience: experience,
        },
        {
          company_name: companyId,
        },
        {
          date: { $gte: date, $lt: nextDay },
        },
        {
          qualifications: qualification,
        },
      ],
    }).populate("company_name", { password: 0 });
    if (job.length === 0) {
      return responseHandler(res, 400, "No job found", false);
    }
    return responseHandler(
      res,
      200,
      "Job Details Sent Successfully",
      true,
      job
    );
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
