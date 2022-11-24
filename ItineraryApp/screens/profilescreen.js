import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import React, {Component, useState, useEffect} from 'react';

const ProfileScreen = () => {
  //loadRoute = () => this.props.navigation.navigate('EditProfileScreen');

  const navigation = useNavigation();

  return (
    <>
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
      </View>
      ;
    </>
  );
};

export default ProfileScreen;

// Grab the initials of the users name and display them in the Avatar
// let name = 'User Name to be configured'; // Pull users name and run regex
// let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

// let initials = [...name.matchAll(rgx)] || [];

initials = (
  (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
).toUpperCase();

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
});

{
  /* <View style={styles.header}></View>
        <View style={styles.profilePicture}></View>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
          <Image
            style={styles.settingsIcon}
            source={require('../assets/icons/Setting_fill.png')}
            resizeMode="contain"
            title="Move to EditProfileScreen"
          />
        </TouchableHighlight>
        <NavigationButton
          tintColor="#000000]"
          title="Move to EditProfileScreen"
          onPress={this.loadRoute}
        />
        <Image
          style={styles.settingsIcon}
          source={require('../assets/icons/Setting_fill.png')}
          resizeMode="contain"
          title="Move to EditProfileScreen"
        /> */
}
