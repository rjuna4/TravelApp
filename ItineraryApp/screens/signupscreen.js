import {Button, ImageBackground, StyleSheet, Text, View, Image, Platform, Dimensions, TouchableOpacity, Pressable, Container} from 'react-native';
import React, { Component, useLayoutEffect } from 'react';
import SignupForm from './signupform'
import { useNavigation } from '@react-navigation/native'


//const image = { uri: "https://images.unsplash.com/photo-1526482312921-58d5666a52c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2130&q=80" };
const localImage = require('ItineraryApp/assets/appimages/signupscreenbackground.png')

const SignupScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
      })
    }, []);

  return(
      <View style={styles.container}>
        <ImageBackground source={localImage} resizeMode="cover" style={styles.image}>
        </ImageBackground>
        <Image source = {require('ItineraryApp/assets/appimages/wanderlist_logo-removebg-preview.png')} style={styles.logo}/>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('SignupForm')}>
          <Text style={styles.custom}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('LoginForm')}>
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
      height: 670,
      width: 500,
      justifyContent: "center"
    },
    logo: {
      flex: 1,
      height: 100,
      width: 440,
      marginHorizontal: -15,
      marginBottom: 100,
      //tintColor: '#FFFFFF'
    },
    custom: {
      fontFamily: 'ABeeZee',
      fontSize: 28,
      color: "white",
      textAlign: "center",
    },
    button1: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 13,
      backgroundColor: "#1D54A6",
      width: 205,
      height: 56,
      bottom: 20,
      marginHorizontal: 100,
    },
    button2: {
      justifyContent: 'center',
      borderRadius: 13,
      backgroundColor: "#E8358B",
      width: 205,
      height: 56,
      marginBottom: 140,
      marginHorizontal: 100
    },


  });