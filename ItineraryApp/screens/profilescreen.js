import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Button,
  SafeAreaView,
  ActivityIndicator,
  TouchableHighlight,
  Image,
  ImageBackgroundComponent,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import CustomAndroid from '../components/CustomAndroid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import EditProfileScreen from './editprofilescreen';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationButton} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from 'react-navigation-stack';
import {navigationRef} from './RootNavigation';
import {
  Avatar,
  Title,
  Caption,
  Text,
  PressableRipple,
} from 'react-native-paper';

class ProfileScreen extends Component {
  //loadRoute = () => this.props.navigation.navigate('EditProfileScreen');

  render() {
    return;
    <View style={styles.container}>
      <View>
        <View>
          <Avatar.Text>"Initials"</Avatar.Text>
        </View>
      </View>
    </View>;
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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

  settingsIcon: {
    right: 35,
    top: -380,
    position: 'absolute',
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
