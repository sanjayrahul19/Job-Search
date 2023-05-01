import { User } from "../../model/user";
import cron from "node-cron";

export const cronJob = (id) => {
  cron.schedule("* * * * *", async () => {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { applied_time: 0 },
      { new: true }
    );
  });
};
