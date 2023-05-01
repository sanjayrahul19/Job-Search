import nodeMailer from  "nodemailer";
import dotenv from "dotenv";

dotenv.config();


export const mailer = function (value, otp) {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });
  const info = transporter.sendMail({
    from: process.env.MAILER_EMAIL,
    to: value.email,
    subject: "Verify Your Email -Node Team",
    html: `
        <div>
        <p><span style="font-weight:bold;font-size:1.6rem">${value.email}</span>,We Welcome to our platform.</p>
      <a style="background-color:#2980B9;color:white" href="http://localhost:8000/user/verify/"><b style="font-weight:bold;font-size:1.4rem">${otp}</b></a>
      <div style="background-color:#6DD5FA">
      <p>Thank and Regards</p>
      <p>From Mini Team</p>
        </div>
        </div>
        `,
  });
};

