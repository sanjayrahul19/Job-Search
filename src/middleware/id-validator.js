import Joi from "joi";
import { responseHandler } from "../response/responseHandler";

Joi.objectId = require("joi-objectid")(Joi);
export const idValidator = (req, res, next) => {
  try {
    const id = Joi.objectId().required().error(new Error("Enter a valid id"));
    const { error, value } = id.validate(req.params.id);
    if (error == undefined) {
      next();
    } else {
      return responseHandler(res, 400, error.message, false);
    }
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
