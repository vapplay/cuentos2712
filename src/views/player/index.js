import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';

import {AppRegistry} from 'react-native';
import App from '../../../App';
import {name as appName} from '../../../app.json';
import {playbackService} from './trackPlayerServices';
import {useEffect, useState} from 'react';
import Share from 'react-native-share';
import {
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {setupPlayer, addTracks} from './trackPlayerServices';
import TrackPlayer, {  State} from 'react-native-track-player';
import {Icon} from '@rneui/themed';
import {Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);

function Controls({onShare}) {
  const navigation = useNavigation();
  const [play, setPlay] = useState(true);

  useEffect(() => {
    return () => {
      setPlay(false);
    }
  }, [])

  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) == State.Playing) {
      TrackPlayer.pause();
      setPlay(true);
    } else {
      TrackPlayer.play();
      setPlay(false);
    }
  }

  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity style={styles.buttonShare} onPress={() => onShare()}>
        <Text style={styles.buttonText}>Compartir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonPlay} onPress={handlePlayPress}>
        <Text style={styles.buttonText}>{play ? 'Play' : 'Pause'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()} >
        <Text style={styles.buttonText}>atras</Text>
      </TouchableOpacity>

      <Icon name="rowing" />

      <Icon name="sc-telegram" type="evilicon" color="#517fa4" />
    </View>
  );
}

function PlayerScreen({ route }) {
  const dataCuento = route.params?.dataCuento;
  console.log(route.params);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const appId = 'com.example.myapp';

  const onShare = () => {
    Share.open({
      title: '¡Descarga mi app!',
      message: 'Esta app es genial, ¡descárgala ahora!',
      url: `https://play.google.com/store/apps/details?id=${appId}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && alert('Ocurrió un error al compartir: ' + error.message);
      });
  };

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks(dataCuento.song);
      }

      setIsPlayerReady(isSetup);
    }

    setup();

  }, []);
  if (!isPlayerReady) {
    return (
      <ActivityIndicator size="large" color="blue" />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{dataCuento.title}</Text>

      <Image
        source={dataCuento.detailImage}
        style={styles.image}
      />

      <Controls onShare={onShare} />
    </SafeAreaView>
  );
}

export default PlayerScreen;