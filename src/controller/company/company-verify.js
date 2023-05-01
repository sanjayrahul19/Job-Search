import { Company } from "../../model/company";
import { responseHandler } from "../../response/responseHandler";

export const companyVerify = async (req, res) => {
  try {
    const companyId = req.companyId;
    const company = await Company.findById({ _id: companyId });
    const otp = req.body.otp;
    if (company.otp === otp) {
      const user = await Company.findByIdAndUpdate(
        {
          _id: companyId,
        },
        { verified: true },
        { new: true }
      );
      return responseHandler(
        res,
        200,
        "Successfully Verified",
        true,
      );
    } else {
      return responseHandler(res, 401, "Incorrect OTP", false);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
