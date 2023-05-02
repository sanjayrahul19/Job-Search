import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMessage = async function (hrEmail, message) {
  const transporter = await nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.MAILER_EMAIL,
    to: hrEmail,
    subject: "Regarding Job",
    html: `
        <div>
        <p style="font-weight:bold;font-size:1.6rem">${message}</p>
      <div style="background-color:#6DD5FA">
      <p>Thank and Regards</p>
        </div>
        </div>
        `,
  });
};
