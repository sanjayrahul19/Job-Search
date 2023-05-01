import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { joiUserSchema, User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";
import { mailer } from "../../mailer/mailer";
import { qualification } from "./create-qualifications";
import dotenv from "dotenv";

dotenv.config();


export const userSignUp = async (req, res) => {
  try {
    let otp = Math.floor(1000 + Math.random() * 9000);
    const { error, value } = joiUserSchema.validate(req.body);
    if (error) {
      return responseHandler(res, 403, error.details[0].message, false);
    } else {
      const hash = await bcrypt.hash(value.password, 10);
      value.password = hash;
      const preUser = await User.findOne({ email: value.email });
      if (preUser) {
        return responseHandler(res, 400, "User already exists", false);
      } else {
        let result;
        const qualificationArray = value.qualifications;

        const user = await new User({
          profile_image: value.profile_image,
          name: value.name,
          email: value.email,
          password: value.password,
          skills: value.skills,
          location: value.location,
          previous_jobs: value.previous_jobs,
          experience: value.experience,
          current_company: value.current_company,
          current_designation: value.current_designation,
          otp: otp,
        });
        let x = [];
        for (let i = 0; i < qualificationArray.length; i++) {
          result = await qualification(
            qualificationArray[i].degree,
            qualificationArray[i].department,
            qualificationArray[i].institution,
            qualificationArray[i].year,
            user._id
          );
          x.push(result._id);
        }
        user.qualifications = x;

        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
          expiresIn: process.env.EXPIRE,
        });
        await mailer(value, otp);
        return responseHandler(res, 200, "Mail sent successfully", true, {
          _id: user._id,
          profile_image: user.profile_image,
          name: user.name,
          email: user.email,
          skills: user.skills,
          location: user.location,
          previous_jobs: user.previous_jobs,
          experience: user.experience,
          current_company: user.current_company,
          current_designation: user.current_designation,
          qualifications: user.qualifications,
          role: user.role,
          token: token,
        });
      }
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
