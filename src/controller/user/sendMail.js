import { User } from "../../model/user";
import { Company } from "../../model/company";
import { responseHandler } from "../../response/responseHandler";
import { sendMessage } from "../../mailer/message";

export const sendMail = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const company = await Company.findById(req.body.company);
    if (user.premium) {
      const mail = company.email;
      const message = req.body.message;
      await sendMessage(mail, message);
      return responseHandler(res, 200, "Mail Sent Successfully", true);
    } else {
      return responseHandler(
        res,
        400,
        "You Don't Have Permission To Send Mail",
        false
      );
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
