import { Router } from "express";
import { userRouter } from "./user-router/user-router";
import { upload } from "./uploads/upload";
import { companyRouter } from "./company-router/company-router";
import { jobRouter } from "./job-router/job-router";
import { logoutRouter } from "./logout/logout-router";
export const router = Router();

router.use("/api/v1", upload);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/company", companyRouter);
router.use("/api/v1/job", jobRouter);
router.use("/api/v1", logoutRouter);
