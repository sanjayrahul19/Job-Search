import { Job } from "../../model/job";
import { Company } from "../../model/company";
import { responseHandler } from "../../response/responseHandler";

export const search = async (req, res) => {
  try {
    if (req.query.qualification) {
      const qualification = await Job.find({
        qualifications: {
          $regex: `^${req.query.qualification}`,
          $options: "i",
        },
      });

      if (qualification.length === 0) {
        return responseHandler(res, 200, "No Job Found", true);
      }
      return responseHandler(
        res,
        200,
        "Job details sent successfully",
        true,
        qualification
      );
    }

    if (req.query.experience) {
      const experience = await Job.find({
        experience: { $regex: `^${req.query.experience}`, $options: "i" },
      });

      if (experience.length === 0) {
        return responseHandler(res, 200, "No Job Found", true);
      }
      return responseHandler(
        res,
        200,
        "Job details sent successfully",
        true,
        experience
      );
    }

    const jobs = req.query.job;
    let companyJobs = [];

    if (jobs) {
      const companies = await Company.find({
        company_name: { $regex: `^${jobs}`, $options: "i" },
      });

      if (companies.length > 0) {
        for (let i = 0; i < companies.length; i++) {
          const jobsForCompany = await Job.find({
            company_name: companies[i]._id.toString(),
          }).populate("company_name", { password: 0 });
          if (jobsForCompany.length !== 0) {
            companyJobs.push(...jobsForCompany);
          }
        }
      }

      if (companies.length === 0) {
        const jobName = await Job.find({
          job: { $regex: `^${jobs}`, $options: "i" },
        }).select("-applied_users");
        if (jobName.length !== 0) {
          companyJobs.push(...jobName);
        }
      }

      if (companyJobs.length === 0) {
        return responseHandler(res, 200, "No Job Found", true);
      }

      return responseHandler(
        res,
        200,
        "Job details sent successfully",
        true,
        companyJobs
      );
    }

    let date;
    let nextDay;
    if (req.query.date) {
      const timeStamp = Date.parse(req.query.date); //converts to milliseconds
      if (!isNaN(timeStamp)) {
        date = new Date(timeStamp);
        date.setUTCHours(0, 0, 0, 0); //sets  hours, minutes, seconds, and milliseconds to 0
        nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        console.log(date);
      }
      const jobDate = await Job.find({
        date: { $gte: date, $lt: nextDay },
      }).select("-applied_users");
      if (jobDate.length === 0) {
        return responseHandler(res, 200, "No Job Found", true);
      }
      return responseHandler(
        res,
        200,
        "Job details sent successfully",
        true,
        jobDate
      );
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
