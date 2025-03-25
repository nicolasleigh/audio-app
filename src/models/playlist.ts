import { Model, ObjectId, Schema, model, models } from 'mongoose';

interface PlaylistDocument {
  title: string;
  owner: ObjectId;
  items: ObjectId[];
  visibility: 'public' | 'private' | 'auto';
}

const playlistSchema = new Schema<PlaylistDocument>(
  {
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Audio', required: true }],
    visibility: {
      type: String,
      enum: ['public', 'private', 'auto'],
      default: 'public',
    },
  },
  { timestamps: true }
);

const Playlist = models.Playlist || model('Playlist', playlistSchema);

export default Playlist as Model<PlaylistDocument>;
