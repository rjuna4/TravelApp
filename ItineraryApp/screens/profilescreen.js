import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import React, {Component, useState, useEffect} from 'react';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundPicture}
        source={{
          uri: 'https://cdn2.hometogo.net/assets/media/pics/1500_500/611b25bfdeedb.jpg',
        }}
      />
      <Image
        style={styles.profilePicture}
        source={{
          uri: 'https://creativeandcultural.files.wordpress.com/2018/04/default-profile-picture.png',
        }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>userFirst userLast</Text>
          <Text style={styles.userName}>userName</Text>
          <Text style={styles.myLikes}>My Likes</Text>
        </View>
      </View>
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
    marginTop: 50,
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
  info: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  settingsIcon: {
    right: 35,
    top: -380,
    position: 'absolute',
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
});
