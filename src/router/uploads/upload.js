import { Router } from "express";
import { imageUpload } from "../../controller/image-uploads/upload";
export const upload = Router();

upload.post("/image-uploads", imageUpload);
