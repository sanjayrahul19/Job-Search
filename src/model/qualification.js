import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

export const Qualification = mongoose.model(
  "qualification",
  qualificationSchema
);
