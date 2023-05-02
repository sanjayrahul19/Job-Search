import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const acceptRejectMail = async function (data, job, user) {
  const transporter = await nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const info =await transporter.sendMail({
    from: process.env.MAILER_EMAIL,
    to: user.email,
    subject: "Regarding Job",
    html: `
        <div>
        <h1>${data.message} for the Interview</h1>
        <h2>For the role ${job.job}</h2>
        <h2>Company Name:${job.company_name.company_name}</h2>
        <h2>Location:${job.company_name.company_location}</h2>
        <h3>Company Type:${job.company_name.company_type}</h3>
        <h3>Company Description:${job.company_name.company_description}</h3>
      <div style="background-color:#6DD5FA">
      <p>Thank and Regards</p>
        </div>
        </div>
        `,
  });
};
