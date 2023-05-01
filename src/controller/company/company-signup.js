import { responseHandler } from "../../response/responseHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mailer } from "../../mailer/mailer";
import { joiCompanySchema, Company } from "../../model/company";
import dotenv from "dotenv";

dotenv.config();


export const createCompany = async (req, res) => {
  try {
    let otp = Math.floor(1000 + Math.random() * 9000);
    const { error, value } = joiCompanySchema.validate(req.body);
    if (error) {
      return responseHandler(res, 403, error.details[0].message, false);
    } else {
      const hash = await bcrypt.hash(value.password, 10);
      value.password = hash;
      const preUser = await Company.findOne({ email: value.email });
      if (preUser) {
        return responseHandler(res, 400, "Company already exists", false);
      } else {
        const company = await Company.create({
          profile_image: value.profile_image,
          company_name: value.company_name,
          email: value.email,
          password: value.password,
          company_location: value.company_location,
          company_type: value.company_type,
          company_description: value.company_description,
          otp: otp,
        });
        const token = await jwt.sign(
          { id: company._id },
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.EXPIRE,
          }
        );
        await mailer(value, otp);
        return responseHandler(res, 200, "Company Created Successfully", true, {
          id: company._id,
          name: company.company_name,
          email: company.email,
          role: company.role,
          token: token,
        });
      }
    }
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
