import { Router } from "express";
export const userRouter = Router();
import { userSignUp } from "../../controller/user/user-signUp";
import { userVerify } from "../../controller/user/user-verify";
import { verifyToken } from "../../middleware/verify-token";
import { userLogin } from "../../controller/user/user-login";
import { userUpdate } from "../../controller/user/user-update";
import { userDelete } from "../../controller/user/user-delete";
import { idValidator } from "../../middleware/id-validator";
import { userDetails } from "../../controller/user/user-get-all";
import { userDetail } from "../../controller/user/user-get";
import { deleteQualification } from "../../controller/user/delete-qualification";
import { applyJob } from "../../controller/user/apply-job";
import { search } from "../../controller/user/filter";
import { appliedJobs } from "../../controller/user/applied-jobs";
import { searchUser } from "../../controller/user/search";
import { sendMail } from "../../controller/user/sendMail";
import { premium } from "../../controller/user/premium";

userRouter.post("/signup", userSignUp);
userRouter.post("/verify", verifyToken, userVerify);
userRouter.post("/login", userLogin);
userRouter.patch("/update/:id", idValidator, userUpdate);
userRouter.delete("/delete/:id", idValidator, userDelete);
userRouter.get("/get/:id", idValidator, userDetail);
userRouter.get("/getall", userDetails);
userRouter.patch("/job-apply/:id", idValidator, applyJob);
userRouter.get("/filter", search);
userRouter.get("/applied-jobs/:id", idValidator, appliedJobs);
userRouter.get("/search", searchUser);
userRouter.post("/send-mail/:id", idValidator, sendMail);
userRouter.patch("/premium/:id", idValidator, premium);
userRouter.delete(
  "/delete-qualification/:id",
  idValidator,
  deleteQualification
);
