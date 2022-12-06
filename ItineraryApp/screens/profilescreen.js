import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundPicture}
        source={{
          uri: 'https://cdn2.hometogo.net/assets/media/pics/1500_500/611b25bfdeedb.jpg',
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
        <Image
          style={styles.settingsIcon}
          source={{
            uri: 'https://i.stack.imgur.com/oLA6F.png',
          }}
        />
      </TouchableOpacity>
      <View style={styles.overlay}></View>
      <Image
        style={styles.profilePicture}
        source={{
          uri: 'https://creativeandcultural.files.wordpress.com/2018/04/default-profile-picture.png',
        }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>Luke Smith</Text>
          <Text style={styles.userName}>smith_00</Text>
          <Text style={styles.myLikes}>My Likes</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.listView}>
          <Image
            style={styles.myLikesPicsLeft}
            source={{
              uri: 'https://www.nationsonline.org/gallery/Qatar/Dark-Clouds-over-West-Bay-Skyline-Doha.jpg',
            }}
          />
          <Image
            style={styles.myLikesPicRight}
            source={{
              uri: 'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYyNDg1MjE3MTI1Mjc5Mzk4/topic-london-gettyimages-760251843-promo.jpg',
            }}
          />
          <Image
            style={styles.myLikesPicsLeft}
            source={{
              uri: 'https://podroztrwa.pl/wp-content/uploads/2021/09/river-6175173_1920-min.jpg',
            }}
          />
          <Image
            style={styles.myLikesPicRight}
            source={{
              uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/9b/2f/5b/cairo.jpg?w=700&h=500&s=1',
            }}
          />
          <Image
            style={styles.myLikesPicsLeft}
            source={{
              uri: 'https://a.cdn-hotels.com/gdcs/production92/d1580/9a28fc70-9bea-11e8-a1b5-0242ac110053.jpg',
            }}
          />
          <Image
            style={styles.myLikesPicRight}
            source={{
              uri: 'https://portal.ehawaii.gov/assets/webp/page/government/counties/honolulu.webp',
            }}
          />
        </View>
        <View style={styles.bottomSpace}></View>
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;

// Grab the initials of the users name and display them in the Avatar
// let name = 'User Name to be configured'; // Pull users name and run regex
// let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

// let initials = [...name.matchAll(rgx)] || [];

// initials = (
//   (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
// ).toUpperCase();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: 775,
    height: 273,
  },
  backgroundPicture: {
    height: 200,
  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    fontSize: 10,
    alignItems: 'center',
    padding: 30,
  },
  profilePicture: {
    width: 130,
    height: 130,
    borderWidth: 2,
    borderRadius: 65,
    borderColor: '#A067A5',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginBottom: 20,
  },
  myLikesPicsLeft: {
    borderRadius: 25,
    height: 155,
    width: 155,
    marginLeft: 20,
    marginVertical: 10,
  },
  myLikesPicRight: {
    borderRadius: 25,
    height: 155,
    width: 155,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  info: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  settingsIcon: {
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: 20,
    height: 25,
    width: 25,
    opacity: 0.7,
  },
  text: {
    fontSize: 30,
  },
  // Users name below the profile picture
  name: {
    fontSize: 20,
    color: '#858383',
    opacity: 0.95,
    fontWeight: 'bold',
  },
  userName: {
    marginTop: 5,
    fontSize: 16,
    opacity: 0.75,
    color: '#858383',
  },
  myLikes: {
    fontSize: 16,
    color: '#696969',
    marginTop: 60,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  bottomSpace: {
    marginBottom: 40,
  },
});
