import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, Image, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { Component, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { response } from 'express';
import AsyncStorage from '@react-native-async-storage/async-storage';

const localImage = require('ItineraryApp/assets/appimages/signupformbackground.png')

const changeVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

}

const SignupForm = () => {
  const navigation = useNavigation();

  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    emailAddress: '',
    password: '',
    confirmPassword: ''
  })


  //const sendToDatabase = () => {


  async function sendToDatabase() {
    //console.log(formData)
      // check if all fields are filled out
      if (!formData.fullName || !formData.username || !formData.emailAddress || !formData.password || !formData.confirmPassword) {
        setErrorMessage('All fields are required.');
        return;
      }
      // check for valid email address
      else if (!formData.emailAddress.includes('@')) {
        setErrorMessage('Invalid email address.');
        return;
      }
      // password validation
      else if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match.")
        return;
      }
      else if (formData.password.length < 7 || formData.confirmPassword.length < 7) {
          setErrorMessage('Password is not long enough. Please enter a password between 7-15 characters.');
      }

      else if (formData.password.length > 15 || formData.confirmPassword.length > 15) {
          setErrorMessage('Password is too long. Please enter a password between 7-15 characters.');
      }
      {/*}
      else {
        fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(res => res.json()).then(
          data => {
            if(data.error) {
              setErrorMessage(data.error);
            } else {
              alert("User created successfully")
              navigation.navigate('HomeScreen')
            }
          }
        )
      } */}
      await fetch('http://10.0.2.2:8000/api/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
    }).then().catch(error=>console.log(error)).then(res => res.json()).then(
      data => {
        //alert("data.errror: ", data.error)
        if(data.error) {
          alert("inside error")
          setErrorMessage(data.error);
        } else {
            if (data.user_id) {
              alert('user id', data.user_id)
              AsyncStorage.setItem('user_id', JSON.stringify(data.user_id))
            }
          alert('User created successfully');
          navigation.navigate('Tabs');
        }
      }
    )
  }


  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
      })
    }, []);
    return (
    <View style={styles.container}>
      <ImageBackground source={localImage} resizeMode="cover" style={styles.localImage}>
        <Text style={styles.text}>Create Account</Text>
        {
          errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null
        }
        <View style={styles.inputContainer}>
        <Image style={styles.userIcon}
                source={require('ItineraryApp/assets/icons/User_fill(1).png')}
        />
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          onChangeText={(text) => setFormData( {...formData, fullName: text})}
          //value={}
        />
         {/* {
          errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null
        } */}
        </View>
        <View style={styles.inputContainer}>
        <Image style={styles.emailIcon}
                source={require('ItineraryApp/assets/icons/Message_alt_fill.png')}
        />   
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          onChangeText={(text) => setFormData( {...formData, emailAddress: text})}
          //value={}
        />
        </View>
        <View style={styles.inputContainer}>
        <Image style={styles.userIcon}
                source={require('ItineraryApp/assets/icons/User_fill(1).png')}
        />   
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={(text) => setFormData( {...formData, username: text})}
          //value={}
        />
        </View>
        <View style={styles.inputContainer}>
        <Image style={styles.passwordIcon}
                source={require('ItineraryApp/assets/icons/Lock_fill.png')}
        />     
        <TextInput
          onChangeText={(text) => setFormData( {...formData, password: text})}
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
        <View style={styles.inputContainer}>
        <Image style={styles.passwordIcon}
                source={require('ItineraryApp/assets/icons/Lock_fill.png')}
        />       
        <TextInput
          onChangeText={(text) => setFormData( {...formData, confirmPassword: text})}
          placeholder=" Confirm Password"
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
      </ImageBackground>
      <TouchableOpacity style={styles.button1} onPress={() => {sendToDatabase()}}>
          <Text style={styles.custom}>Sign Up</Text>
      </TouchableOpacity>
        <Text style={[styles.text2, {bottom: 70} ]}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
          <Text style={[styles.text2, {bottom: 70} ]}>Login here.</Text>
        </TouchableOpacity>  
    </View>  
    )  
  }
export default SignupForm

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  localImage: {
    flex: 1,
    justifyContent: "center",
    height: 660,
    width: 420,
  },
  text: {
    fontSize: 35,
    textAlign: "center",
    color: "#FFFFFF",
    bottom: 15
    // 
  },
  text2: {
    textAlign: "center",
    color: "#FFFFFF",
    textDecorationLine: 'underline',
  },
  custom: {
    fontFamily: 'ABeeZee',
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: 'white',
    width: 278,
    height: 40,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d7d7d7',
    
    marginHorizontal: 68,
    marginTop: 5,
    marginBottom: 5,
    // bottom: -50
  },
  input: {
    fontSize: 18,
    marginTop: -4,
    color: '#685F5F',
  },

  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: "#CE80D4",
    width: 205,
    height: 56,
    bottom: 90,
    // marginBottom: 75,
    marginHorizontal: 105,
  },
  userIcon: {
    tintColor: '#000000',
    opacity: 0.45,
    width: 30,
    height: 30,
  },
  emailIcon: {
    width: 30,
    height: 30,
  },
  passwordIcon: {
    width: 30,
    height: 30,
  },
  errorMessage: {
    color: '#FFFFFF',
    width: 250,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#DA5263',
    left: 85,
    marginBottom: 10
  }
});







