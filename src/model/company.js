import mongoose from "mongoose";
import joi from "joi";

export const joiCompanySchema = joi.object({
  profile_image: joi.string(),
  company_name: joi.string().trim().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .trim()
    .required(),
  password: joi.string().min(5).max(12).trim().required(),
  company_location: joi.string().trim().required(),
  company_type: joi.string().trim().required(),
  company_description: joi.string().trim().required(),
  role: joi.string(),
});

export const joiCompanyUpdateSchema = joi.object({
  profile_image: joi.string(),
  company_name: joi.string().trim(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .trim(),
  password: joi.string().min(5).max(12).trim(),
  company_location: joi.string(),
  company_type: joi.string(),
  company_description: joi.string(),
});

const companySchema = new mongoose.Schema(
  {
    profile_image: {
      type: String,
    },
    company_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    company_location: {
      type: String,
      required: true,
    },
    company_type: {
      type: String,
      required: true,
    },
    company_description: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "company",
    },
    otp: {
      type: Number,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

export const Company = mongoose.model("company", companySchema);
