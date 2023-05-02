import { responseHandler } from "../../response/responseHandler";
import { Company } from "../../model/company";

export const getCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.findById(id).select("-password");
    if (!company) {
      return responseHandler(res, 400, "Company Not Found", false);
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
