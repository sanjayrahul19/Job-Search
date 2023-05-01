import mongoose from "mongoose";
import joi from "joi";
joi.objectId = require("joi-objectid")(joi);

export const joiUserSchema = joi.object({
  profile_image: joi.string(),
  name: joi.string().trim().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .trim()
    .required(),
  password: joi.string().min(5).max(12).trim().required(),
  skills: joi.array().required(),
  qualifications: joi.array().required(),
  location: joi.string().required(),
  previous_jobs: joi.array(),
  experience: joi.string(),
  current_company: joi.string(),
  current_designation: joi.string(),
  premium: joi.boolean().default(false),
  applied_time: joi.number().default(0),
  verified: joi.boolean().default(false),
  role: joi.string(),
});

export const joiUpdateSchema = joi.object({
  _id: joi.string(),
  profile_image: joi.string(),
  name: joi.string().trim(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .trim(),
  verified: joi.boolean(),
  password: joi.string().min(5).max(12).trim(),
  role: joi.string(),
  skills: joi.array(),
  location: joi.string(),
  previous_jobs: joi.array(),
  experience: joi.string().trim(),
  current_designation: joi.string().trim(),
  current_company: joi.string().trim(),
  qualifications: joi.array(),
  otp: joi.number(),
  premium: joi.boolean(),
  applied_time: joi.number(),
});

const userSchema = new mongoose.Schema(
  {
    profile_image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    skills: {
      type: Array,
      required: true,
    },
    qualifications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "qualification",
      },
    ],
    location: {
      type: String,
      required: true,
    },
    previous_jobs: {
      type: Array,
    },
    experience: {
      type: String,
    },
    current_company: {
      type: String,
    },
    current_designation: {
      type: String,
    },
    experience: {
      type: String,
    },
    otp: {
      type: Number,
      required: true,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    applied_time: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

export const User = mongoose.model("user", userSchema);
