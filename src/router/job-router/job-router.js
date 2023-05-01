import { Router } from "express";
export const jobRouter = Router();
import { deleteJob } from "../../controller/job/job-delete";
import { idValidator } from "../../middleware/id-validator";
import { role } from "../../middleware/role";
import { permit } from "../../middleware/permit";
import { jobUpload } from "../../controller/job/upload-job";
import { getJobs } from "../../controller/job/job-gets";
import { updateJob } from "../../controller/job/job-update";
import { getJob } from "../../controller/job/job-get";
import { singleJob } from "../../controller/job/single-job";
import { getJobCompany } from "../../controller/job/get-job-company";

jobRouter.post("/job-upload/:id", role, permit(["company"]), jobUpload);
jobRouter.get("/get-job-company/:id", role, permit(["company"]), getJobCompany);
jobRouter.delete(
  "/delete/:id",
  role,
  permit(["company"]),
  idValidator,
  deleteJob
);
jobRouter.get("/getall", getJobs);
jobRouter.get("/get/:id", idValidator, getJob);
jobRouter.patch(
  "/update/:id",
  role,
  permit(["company"]),
  idValidator,
  updateJob
);
jobRouter.post("/create", role, permit(["company"]), singleJob);
