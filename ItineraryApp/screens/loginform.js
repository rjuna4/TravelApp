import {Icon, SafeAreaView, TextInput, ImageBackground, Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { Component, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const image = { uri: "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=998&q=80"};

const changeVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

}

const inputField = () => {
    // const [text, onChangeText] = React.useState("Username");
    // const [secure, setSecure] = React.useState(props.secure);
  
    return (
      <SafeAreaView>
        <View style={styles.inputContainer}>
        <Image style={styles.userIcon}
                source={require('ItineraryApp/assets/icons/User_fill(1).png')}
        />    
        <TextInput
          placeholder="Username"
          style={styles.input}
          //onChangeText={onChangeText}
          //value={}
        />
        </View>
        <View style={styles.inputContainer}>
        <Image style={styles.passwordIcon}
                source={require('ItineraryApp/assets/icons/Lock_fill.png')}
        />    
        <TextInput
          //onChangeText={(value) => console.log(value)}
          placeholder="Password"
          secureTextEntry
          secure={true}
          style={styles.input}
        />
        {/* {
        <Icon style={{ paddingRight: 15, }}
        name={secure ? "eye" : 'eye-slash'}
        size={20} color='gray' 
        onPress={() => setSecure(!secure)} />
        } */}
        </View>
      </SafeAreaView>
    );
  };

const LoginForm = () => {
  const navigation = useNavigation();
    return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Welcome Back!</Text>
         {inputField()}
        <Text style={styles.text}>Remember me?</Text>
        <Text style={styles.text}>Forgot username and/or password?</Text>
        <Text style={styles.text2}>Click Here.</Text>
      </ImageBackground>
      <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Tabs')}>
          <Text style={styles.custom}>Login</Text>
        </TouchableOpacity>
        <Text style={[styles.text, {bottom: 90} ]}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupForm')}>
          <Text style={[styles.text2, {bottom: 90}]}>Sign up here.</Text>
        </TouchableOpacity>  
    </View>  
    )  
  }
export default LoginForm

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: 660,
    width: 420,
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 38,
    color: "white",
    textAlign: "center",
    bottom: 10,
  },
  text: {
    textAlign: "center",
    color: "#FFFFFF",
  },
  text2: {
    textAlign: "center",
    color: "#FFFFFF",
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  custom: {
    fontFamily: 'ABeeZee',
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d7d7d7',
    marginHorizontal: 40,
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    fontSize: 18,
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: "#DA5263",
    width: 205,
    height: 56,
    bottom: 100,
    marginHorizontal: 100
  },
  userIcon: {
    tintColor: '#000000',
    opacity: 0.45,
    width: 25,
    height: 25,
    marginLeft: 5
  },
  passwordIcon: {
    width: 25,
    height: 25,
    marginLeft: 5
  },
});