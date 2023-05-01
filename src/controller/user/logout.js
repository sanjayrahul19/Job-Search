import { responseHandler } from "../../response/responseHandler";

export const logout = async (req, res) => {
  try {
    return responseHandler(res, 200, "LoggedOut Successfully", true);
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};