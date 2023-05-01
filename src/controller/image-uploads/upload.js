import { responseHandler } from "../../response/responseHandler";

export const imageUpload = async (req, res) => {
  try {
    if (req.files == null || req.files == undefined) {
      return responseHandler(res, 400, "Please upload a proper file", false);
    } else {
      const file = req.files.file;
      const time = new Date().toLocaleTimeString("en-In");
      const filePath = "./public/uploads/" + time + file.name;
      if (file.truncated) {
        throw new Error("File size is Too Big...");
      }
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        await file.mv(filePath, (err) => {
          if (err) {
            return responseHandler(res, 400, err.message, false);
          } else {
            return responseHandler(
              res,
              200,
              "File uploaded",
              true,
              "/users/sanjay/Downloads/Sparkout tech/node/fileUpload-express/public/uploads" +
                time +
                file.name
            );
          }
        });
      } else {
        return responseHandler(res, 400, "We only support png,jpg,jpeg", false);
      }
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
