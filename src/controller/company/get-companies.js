import { responseHandler } from "../../response/responseHandler";
import { Company } from "../../model/company";

export const getCompanies = async (req, res) => {
  try {
    const company = await Company.find().select("-password");
    if (company.length === 0) {
      return responseHandler(res, 200, "No Company Found", true, company);
    }
    return responseHandler(
      res,
      200,
      "Company Details Successfully",
      true,
      company
    );
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
