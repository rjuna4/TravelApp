import {ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { Component } from 'react';
export default SignupScreen

const image = { uri: "https://unsplash.com/photos/lu8-EpYHkho" };



class SignupScreen extends Component {
  render(){
    return (
      <Container>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}>App Name</Text>
        </ImageBackground>
          <TouchableOpacity style={styles.button} onPress={() => signup()}>
            <Text style = {styles.buttonText}> Sign Up </Text>
          </TouchableOpacity>  
          <TouchableOpacity style={styles.button} onPress={() => login()}>
            <Text style = {styles.buttonText}> Login </Text>
          </TouchableOpacity>  
          <TouchableOpacity style={styles.button} onPress={() => guest()}>
            <Text style = {styles.buttonText}> Guest </Text>
          </TouchableOpacity>
      </View>
      </Container>
    )
  }
};


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    buttonText: {
      color: "white",
      fontSize: 28,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: "ABeeZee",
    },
    /* button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 13
    }, */

  });