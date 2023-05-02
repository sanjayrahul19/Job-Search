import { Company } from "../../model/company";
import bcrypt from "bcrypt";
import { responseHandler } from "../../response/responseHandler";
import jwt from "jsonwebtoken";
import { mailer } from "../../mailer/mailer";
import dotenv from "dotenv";

dotenv.config();

export const companyLogin = async (req, res) => {
  try {
    let otp = Math.floor(1000 + Math.random() * 9000);
    const company = await Company.findOne({ email: req.body.email });
    if (company) {
      if (company.verified) {
        const password = await bcrypt.compare(
          req.body.password,
          company.password
        );
        if (password) {
          const token = await jwt.sign(
            { id: company._id, role: company.role },
            process.env.SECRET_KEY
          );
          return responseHandler(res, 200, "LoggedIn Successfully", true, {
            id: company._id,
            name: company.company_name,
            email: company.email,
            type: company.company_type,
            location: company.company_location,
            role: company.role,
            token: token,
          });
        } else {
          return responseHandler(res, 401, "Incorrect password", false);
        }
      } else {
        const updatedOtp = await Company.findOneAndUpdate(
          { email: req.body.email },
          { otp: otp },
          { new: true }
        ).select("-password");
        await mailer(updatedOtp, otp);
        return responseHandler(
          res,
          401,
          "Your Not Verified,Check Your Mail And Verify Now",
          false,
          updatedOtp
        );
      }
    } else {
      return responseHandler(res, 404, "Company Not found", false);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
