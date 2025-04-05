import {useEffect, useState} from 'react';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

export default function InitPlayer() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const setupPlayer = async () => {
      if (isReady) {
        return;
      }
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        progressUpdateEventInterval: 10, // in order to make Event.PlaybackProgressUpdated work, must set this value. Every 10s will emit event
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    };
    setupPlayer().catch(err => console.error(err));
    setIsReady(true);
  }, [isReady]);
}
