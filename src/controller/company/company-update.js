import { responseHandler } from "../../response/responseHandler";
import { Company, joiCompanyUpdateSchema } from "../../model/company";
import bcrypt from "bcrypt";

export const updateCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = joiCompanyUpdateSchema.validate(req.body);
    if (error) {
      return responseHandler(res, 403, error.details[0].message, false);
    } else {
      if (value.password) {
        const hash = await bcrypt.hash(value.password, 10);
        value.password = hash;
      }
      const company = await Company.findByIdAndUpdate(id, req.body, {
        new: true,
      }).select("-password");
      if (!company || company === null) {
        return responseHandler(res, 400, "Enter a valid Id", false);
      }
      return responseHandler(
        res,
        200,
        "Company Updated Successfully",
        true,
        company
      );
    }
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
