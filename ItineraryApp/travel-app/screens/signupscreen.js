import {Button, ImageBackground, StyleSheet, Text, View, Image, Platform, Dimensions, TouchableOpacity, Pressable, Container} from 'react-native';
import React, { Component, useLayoutEffect } from 'react';
import SignupForm from './signupform'
import { useNavigation } from '@react-navigation/native'
import { useLoadFonts, fonts } from '../components/FontLoader';


//const image = { uri: "https://images.unsplash.com/photo-1526482312921-58d5666a52c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2130&q=80" };
const localImage = require('travel-app/assets/appimages/background.png')


const SignupScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
      })
    }, []);
  
  useLoadFonts();

  return(
      <View style={styles.container}>
        <ImageBackground source={localImage} resizeMode="cover" style={styles.image}>
        </ImageBackground>
        <Image source = {require('travel-app/assets/appimages/wanderlist_logo-removebg-preview.png')} style={styles.logo}/>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignupForm')}>
          <Text style={styles.custom}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginForm')}>
          <Text style={styles.custom}>Login</Text>
        </TouchableOpacity>
      </View> 
      
    )
}

export default SignupScreen


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    image: {
      flex: 1,
      justifyContent: "center",
      height: 812,
      width: 375,
      justifyContent: "center"
    },
    logo: {
      top: 20,
      height: 100,
      width: 390,
      marginBottom: 160,
      marginHorizontal: -10,
      //tintColor: '#FFFFFF'
    },
    custom: {
      fontFamily: fonts.outfitRegular,
      fontSize: 24,
      color: "white",
      textAlign: "center",
    },
    signUpButton: {
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 13,
      backgroundColor: "#57C2AF",
      width: 160,
      height: 43,
      bottom: 20,
      marginHorizontal: 100,
    },
    loginButton: {
      borderRadius: 35,
      justifyContent: 'center',
      borderRadius: 13,
      backgroundColor: "#1D54A6",
      width: 160,
      height: 43,
      marginBottom: 240,
      marginHorizontal: 100
    },


  });