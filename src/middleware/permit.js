import { responseHandler } from "../response/responseHandler";

export const permit = (allowed) => {
  return (req, res, next) => {
    const role = req.role;
    if (allowed.includes(role)) {
      next();
    } else {
      return responseHandler(res, 400, "You don't have permission", false);
    }
  };
};
