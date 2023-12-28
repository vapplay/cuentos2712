import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { styles } from './styles';

function HomeScreen({ navigation }) {
  const songs = [{
    image: require('../../assets/images/imageFrida.png'),
    detailImage: require('../../assets/images/imageDetailFrida.png'),
    song: require('../../assets/songs/Cancion1.mp3'),
    name: 'Frida',
    title: 'Titulo del cuento',
    style: {
      image: styles.imageLeft,
      text: styles.textLeft
    },
  },
  {
    image: require('../../assets/images/imageJKR.png'),
    detailImage: require('../../assets/images/imageDetailJKR.png'),
    song: require('../../assets/songs/Cancion2.mp3'),
    name: 'Joanne R',
    title: 'Titulo del cuento',
    style: {
      image: styles.imageRight,
      text: styles.textRight
    },
  },
  {
    image: require('../../assets/images/imageMarie.png'),
    detailImage: require('../../assets/images/imageDetailMarie.png'),
    song: require('../../assets/songs/Cancion1.mp3'),
    name: 'Marie',
    title: 'Titulo del cuento',
    style: {
      image: styles.imageRight,
      text: styles.textRight
    },
  },
  {
    image: require('../../assets/images/imageSerena.png'),
    detailImage: require('../../assets/images/imageDetailSerena.png'),
    song: require('../../assets/songs/Cancion2.mp3'),
    name: 'Serena',
    title: 'Titulo del cuento',
    style: {
      image: styles.imageLeft,
      text: styles.textLeft
    },
    }];
  const renderImage = item => (
    <TouchableOpacity onPress={() => navigation.navigate('Player', {dataCuento: item})}>
            <View style={styles.borderImg}>
        <Image
          style={item.style.image}
          source={item.image}
        />
        <Text
          style={item.style.text}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.Title} >Selecciona  tu mágico cuento para el día de hoy 123 =) ¡</Text>
          <View style={styles.containerimages}>
            {renderImage(songs[0])}
            {renderImage(songs[1])}
          </View>
          <View style={styles.containerimages}>
            {renderImage(songs[2])}
            {renderImage(songs[3])}
          </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;