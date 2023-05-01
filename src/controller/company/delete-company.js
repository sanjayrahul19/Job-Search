import { responseHandler } from "../../response/responseHandler";
import { Company } from "../../model/company";

export const deleteCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.findByIdAndDelete(id).select("-password");
    return responseHandler(
      res,
      200,
      "Company Deleted Successfully",
      true,
      company
    );
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
