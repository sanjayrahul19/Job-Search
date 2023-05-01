import { Qualification } from "../../model/qualification";

export const qualification = async (
  degree,
  department,
  institution,
  year,
  userId
) => {
  try {
    const qualifications = await Qualification.create({
      degree: degree,
      department: department,
      institution: institution,
      year: year,
      user: userId,
    });
    return qualifications;
  } catch (err) {
    console.log(err);
  }
};
