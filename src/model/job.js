import mongoose from "mongoose";
import joi from "joi";

export const joiJobUpdateSchema = joi.object({
  job: joi.string().trim(),
  qualifications: joi.string().trim(),
  description: joi.string().trim(),
  experience: joi.string().trim(),
  salary: joi.number(),
  date: joi.string().trim(),
});

const jobSchema = new mongoose.Schema(
  {
    company_name: {
      type: mongoose.Types.ObjectId,
      ref: "company",
    },
    job: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    applied_users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { versionKey: false }
);

export const Job = mongoose.model("job", jobSchema);
