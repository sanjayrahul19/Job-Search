import { Qualification } from "../../model/qualification";
import { joiUpdateSchema, User } from "../../model/user";
import { responseHandler } from "../../response/responseHandler";
import bcrypt from "bcrypt";

export const userUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = joiUpdateSchema.validate(req.body);
    if (error) {
      return responseHandler(res, 403, error.details[0].message, false);
    } else {
      if (value.password) {
        const hash = await bcrypt.hash(value.password, 10);
        value.password = hash;
      }

      const re = req.body.qualifications;

      for (let i = 0; i < re.length; i++) {
        if (re[i]._id) {
          await Qualification.findByIdAndUpdate(
            re[i]._id,
            {
              degree: re[i].degree,
              department: re[i].department,
              institution: re[i].institution,
              year: re[i].year,
            },
            {
              new: true,
            }
          );
        } else {
          const createdQualification = await Qualification.create(re[i]);
          await User.findByIdAndUpdate(
            id,
            { $push: { qualifications: createdQualification._id } },
            { new: true }
          );
        }
      }
      const user = await User.findByIdAndUpdate(
        id,
        {
          profile_image: req.body.profile_image,
          name: req.body.name,
          email: req.body.email,
          password: value.password,
          skills: req.body.skills,
          location: req.body.location,
          previous_jobs: req.body.previous_jobs,
          experience: req.body.experience,
          current_company: req.body.current_company,
          current_designation: req.body.current_designation,
        },
        {
          new: true,
        }
      )
        .select("-password")
        .populate("qualifications");
      if (!user || user === null) {
        return responseHandler(res, 400, "Enter a valid Id", false);
      }
      return responseHandler(
        res,
        200,
        "User details updated successfully",
        true,
        user
      );
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
