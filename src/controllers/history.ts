import { historyType } from '#/@types/other';
import History from '#/models/history';
import { RequestHandler } from 'express';

export const updateHistory: RequestHandler = async (req, res) => {
  const oldHistory = await History.findOne({ owner: req.user.id });

  const { audio, progress, date } = req.body;

  const history: historyType = { audio, progress, date };

  if (!oldHistory) {
    await History.create({
      owner: req.user.id,
      last: history,
      all: [history],
    });
    return res.json({ success: true });
  }

  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const histories = await History.aggregate([
    { $match: { owner: req.user.id } },
    { $unwind: '$all' },
    {
      $match: {
        'all.date': {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $project: {
        _id: 0,
        audio: '$all.audio',
      },
    },
  ]);

  // const sameDayHistory = histories.find((item) => {
  //   if (item.audio.toString() === audio) return item;
  // });
  const sameDayHistory = histories.find(
    (item) => item.audio.toString() === audio
  );

  if (sameDayHistory) {
    await History.findOneAndUpdate(
      {
        owner: req.user.id,
        'all.audio': audio,
      },
      {
        // https://www.mongodb.com/docs/manual/reference/operator/update/positional/
        $set: {
          'all.$.progress': progress,
          'all.$.date': date,
        },
        // $set: {
        //   'all.progress': progress,
        //   'all.date': date,
        // },  // does not work
      }
    );
  } else {
    await History.findByIdAndUpdate(oldHistory._id, {
      $push: { all: { $each: [history], $position: 0 } }, // insert at the beginning  https://www.mongodb.com/docs/manual/reference/operator/update/each/
      $set: { last: history },
    });
  }

  res.json({ success: true });
};

export const removeHistory: RequestHandler = async (req, res) => {
  const removeAll = req.query.all === 'yes';

  if (removeAll) {
    await History.findOneAndDelete({ owner: req.user.id });
    return res.json({ success: true });
  }

  const histories = req.query.histories as string;
  const ids = JSON.parse(histories) as string[];
  await History.findOneAndUpdate(
    { owner: req.user.id },
    {
      $pull: { all: { _id: ids } },
    }
  );
  res.json({ success: true });
};
