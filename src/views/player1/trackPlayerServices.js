import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
}

export async function addTracks() {
  await TrackPlayer.add([
    {
      id: '1',
      url: require('./Cancion1.mp3'),
      title: 'Opera9',
      artist: 'Chopin',
      duration: 60,
    },


    // export async function addTracks(songs) {
    //   const tracksToAdd = songs.map(song => ({
    //     id: song.id,
    //     url: song.url,
    //     title: song.title,
    //     artist: song.artist,
    //     duration: song.duration,
    //   }));
    
    //   await TrackPlayer.reset();  // Limpiamos la lista actual antes de agregar nuevas canciones
    //   await TrackPlayer.add(tracksToAdd);
    //   await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    // }






  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {
  // TODO: Attach remote event handlers
}
