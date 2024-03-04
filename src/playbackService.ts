import TrackPlayer, {Event} from 'react-native-track-player';
import {getClient} from './api/client';

const playbackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async e => {
    // console.log(e) {"buffered": 90.69714285714285, "duration": 90.69714285714285, "position": 3.001139672, "track": 0}
    const lists = await TrackPlayer.getQueue();
    const audio = lists[e.track];
    // console.log(audio); // {"artist": "nicolas", "artwork": "", "genre": "Arts", "id": "", "isLiveStream": true, "title": "", "url": ""}
    const client = await getClient();
    await client
      .post('/history', {
        audio: audio.id,
        progress: e.position,
        date: new Date(Date.now()),
      })
      .catch(err => console.log(err));
  });
};

export default playbackService;
