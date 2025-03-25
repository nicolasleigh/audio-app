import { historyType } from '#/@types/other';
import { Model, ObjectId, Schema, model, models } from 'mongoose';

interface HistoryDocument {
  owner: ObjectId;
  last: historyType;
  all: historyType[];
}

const historySchema = new Schema<HistoryDocument>(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    last: {
      audio: { type: Schema.Types.ObjectId, ref: 'Audio' },
      progress: Number,
      date: { type: Date, required: true },
    },
    all: [
      {
        audio: { type: Schema.Types.ObjectId, ref: 'Audio' },
        progress: Number,
        date: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

const History =
  models.History || model<HistoryDocument>('History', historySchema);

export default History as Model<HistoryDocument>;
