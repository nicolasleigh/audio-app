import Audio from "#/models/audio";
import AutoGeneratedPlaylist from "#/models/autoGeneratedPlaylist";
import { RequestHandler } from "express";
import cron from "node-cron";

// cron.schedule("*/2 * * * * *", () => {
//   // running every 2 seconds
//   console.log("running");
// });

const generatedPlaylist = async () => {
  const result = await Audio.aggregate([
    { $sort: { likes: -1 } },
    { $sample: { size: 20 } },
    {
      $group: {
        _id: "$category",
        audios: { $push: "$$ROOT._id" },
      },
    },
  ]);

  result.forEach(async (item) => {
    await AutoGeneratedPlaylist.updateOne(
      { title: item._id },
      {
        $set: { items: item.audios },
      },
      {
        upsert: true,
      }
    );
  });
};

cron.schedule("0 0 * * *", async () => {
  // running every 24 hours
  await generatedPlaylist();
});

// cron.schedule("* * * * *", async () => {
//   // running every 1 minute
//   await generatedPlaylist();
// });
