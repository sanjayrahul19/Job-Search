import { responseHandler } from "../../response/responseHandler";
import XLSX from "xlsx";
import { Job } from "../../model/job";
export const jobUpload = async (req, res) => {
  try {
    if (req.files == null || req.files == undefined) {
      return responseHandler(res, 400, "Please upload a proper file", false);
    } else {
      const file = req.files.file;
      const fileBuffer = file.data;
      const workbook = XLSX.read(fileBuffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);
      for (let i = 0; i < data.length; i++) {
        const jobData = data[i];
        const file = await Job.create({
          company_name: req.params.id,
          qualifications: jobData.qualifications,
          description: jobData.description,
          experience: jobData.experience,
          salary: jobData.salary,
          date: jobData.date,
          job: jobData.job,
        });
      }
      const time = new Date().toLocaleTimeString("en-In");
      const filePath = "./public/job-upload/" + time + file.name;
      if (file.truncated) {
        throw new Error("File size is Too Big...");
      }
      if (
        file.mimetype !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        return responseHandler(res, 400, "we support only xlsx format", false);
      }
      await file.mv(filePath, (err) => {
        if (err) {
          return responseHandler(res, 400, err.message, false);
        } else {
          return responseHandler(res, 200, "File uploaded", true);
        }
      });
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
