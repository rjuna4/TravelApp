import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
//import EditProfileScreen from './editprofilescreen';
import {Avatar, Title, Caption, PressableRipple} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = () => {
  //loadRoute = () => this.props.navigation.navigate('EditProfileScreen');

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.info}>
          <View>
            <Text style={styles.text}>Initials</Text>
            <Avatar.Image
              size={100}
              source={{
                uri: '',
              }}
            />
          </View>
        </View>
      </View>
      ;
    </>
  );
};

export default ProfileScreen;

// Grab the initials of the users name and display them in the Avatar
let name = 'User Name to be configured'; // Pull users name and run regex
let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

let initials = [...name.matchAll(rgx)] || [];

initials = (
  (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
).toUpperCase();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },

  header: {
    width: 775,
    height: 273,
  },

  profilePicture: {
    width: 143,
    height: 143,
    borderRadius: 143 / 2,
    borderColor: '#DA5263',
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
