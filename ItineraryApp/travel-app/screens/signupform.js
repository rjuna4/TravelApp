import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, Image, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { Component, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { response } from 'express';
import { useLoadFonts, fonts } from '../components/FontLoader';
//import AsyncStorage from '@react-native-community/async-storage'

const localImage = require('travel-app/assets/appimages/signup.png')

const changeVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

}

const SignupForm = () => {
  const navigation = useNavigation();

  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageEmail, setErrorMessageEmail] = useState(null);
  const [errorMessagePswdMismatch, setErrorMessagePswdMismatch] = useState(null);
  const [errorMessagePswdTooShort, setErrorMessagePswdTooShort] = useState(null);
  const [errorMessagePswdTooLong, setErrorMessagePswdTooLong] = useState(null);

  const [userId, setUserId] = useState(null);

  useLoadFonts();

  async function saveUserId(userId) {
    try {
      await AsyncStorage.setItem('user_id', userId)
      setUserId(userId)
    } catch (e) {
      console.error('Failed to save user id.')
    }
  }


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
        setErrorMessageEmail('Invalid email address.');
        return;
      }
      // password validation
      else if (formData.password !== formData.confirmPassword) {
        setErrorMessagePswdMismatch("Passwords do not match.")
        return;
      }
      else if (formData.password.length < 7 || formData.confirmPassword.length < 7) {
          setErrorMessagePswdTooShort('Password must be between 7-15 characters.');
      }

      else if (formData.password.length > 15 || formData.confirmPassword.length > 15) {
          setErrorMessagePswdTooLong('Password must be between 7-15 characters.');
      }
      await fetch('http://10.24.66.78:8081/api/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
    }).then().catch(error=>console.log(error)).then(res => res.json()).then(
      data => {
        //alert("data.errror: ", data.error)hich 
        if(data.error) {
          //alert("inside error")
          setErrorMessage(data.error);
          //alert("data error: ", data.error)
        } else {
            //alert('user_id', data.user_id)
              // setUserId(data.user_id)
              saveUserId(data.user_id)
              AsyncStorage.setItem('user_id', data.user_id)
            // if (data.user_id) {
            //   //alert('username', data.username)
            //   alert('user_id', data.user_id)
            //   setUserId(data.user_id)
            //   //AsyncStorage.setItem(data.username, data.user_id)
            // }
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
        <Text style={styles.text}>Sign Up</Text>
        {
          errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null
        }
        <View style={styles.inputContainer}>
        <Image style={styles.userIcon}
                resizeMode="contain"
                source={require('travel-app/assets/icons/user.png')}
        />
        <TextInput
          placeholder="Full Name"
          placeholderTextColor='#FFFFFF'
          style={styles.input}
          onChangeText={(text) => setFormData( {...formData, fullName: text})}
          
          //value={}
        />
         {/* {
          errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null
        } */}
        </View>
        <View>
          <View style={styles.separator}/>
        </View>
        <View style={styles.inputContainer}>
        <Image style={styles.emailIcon}
                resizeMode="contain"
                source={require('travel-app/assets/icons/email.png')}
        />   
        <TextInput
          placeholder="Email Address"
          placeholderTextColor='#FFFFFF'
          style={styles.input}
          onChangeText={(text) => setFormData( {...formData, emailAddress: text})}
          //value={}
        />
        </View>
        <View>
          <View style={styles.separator}/>
        </View>
        {
          errorMessageEmail ? <Text style={styles.errorMessage}>{errorMessageEmail}</Text> : null
        }
        <View style={styles.inputContainer}>
        <Image style={styles.userIcon}
                resizeMode="contain"
                source={require('travel-app/assets/icons/user.png')}
        />   
        <TextInput
          placeholder="Username"
          placeholderTextColor='#FFFFFF'
          style={styles.input}
          onChangeText={(text) => setFormData( {...formData, username: text})}
          //value={}
        />
        </View>
        <View>
          <View style={styles.separator}/>
        </View>
        <View style={styles.inputContainer}>
        <Image style={styles.passwordIcon}
                resizeMode="contain"
                source={require('travel-app/assets/icons/password.png')}
        />     
        <TextInput
          onChangeText={(text) => setFormData( {...formData, password: text})}
          placeholder="Password"
          placeholderTextColor='#FFFFFF'
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
        <View>
          <View style={styles.separator}/>
        </View>
        {
          errorMessagePswdTooShort ? <Text style={styles.errorMessage}>{errorMessagePswdTooShort}</Text> : null
        }
        {
          errorMessagePswdTooLong ? <Text style={styles.errorMessage}>{errorMessagePswdTooLong}</Text> : null
        }
        <View style={styles.inputContainer}>
        <Image style={styles.passwordIcon}
                resizeMode="contain"
                source={require('travel-app/assets/icons/password.png')}
        />       
        <TextInput
          onChangeText={(text) => setFormData( {...formData, confirmPassword: text})}
          placeholder=" Confirm Password"
          placeholderTextColor='#FFFFFF'
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
        <View>
          <View style={styles.separator}/>
        </View>
        {
          errorMessagePswdMismatch ? <Text style={styles.errorMessage}>{errorMessagePswdMismatch}</Text> : null
        }
          <TouchableOpacity style={styles.button1} onPress={() => {sendToDatabase()}}>
          <Text style={styles.custom}>Sign Up</Text>
      </TouchableOpacity> 
      </ImageBackground>
    
      <View style={{bottom: 65}}>
        <Text style={[styles.text1, {bottom: 60} ]}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
          <Text style={[styles.text2, {bottom: 60} ]}>Login here.</Text>
        </TouchableOpacity>  
      </View>  
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
    height: 812,
    width: 375,
  },
  text: {
    fontFamily: fonts.outfitMedium,
    fontSize: 38,
    textAlign: "center",
    color: "#FFFFFF",
    bottom: 15
  },

  text1: {
    textAlign: "center",
    color: "#6C696C",
    fontSize: 17,
    fontFamily: fonts.outfitRegular,
  },
  text2: {
    textAlign: "center",
    color: "#6C696C",
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: fonts.outfitSemiBold,
  },
  custom: {
    fontFamily: fonts.outfitRegular,
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
  inputContainer: {
    //backgroundColor: 'white',
    width: '75%',
    height: 45,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: 1,
    //borderColor: '#FFFFFF',
    marginHorizontal: 50,
    marginTop: 5,
    marginBottom: 5,
    color: '#FFFFFF',
    // bottom: -50
  },
  separator: {
    height: 1,
    marginTop: -10,
    width: 270,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF'
  },
  input: {
    fontSize: 18,
    marginTop: -4,
    color: '#FFFFFF',
    fontFamily: fonts.outfitRegular,
  },

  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: "#1D54A6",
    width: 160,
    marginTop: 10,
    height: 46,
    marginBottom: 10,
    // marginBottom: 75,
    marginHorizontal: 110,
  },
  userIcon: {
    width: 30,
    height: 30,
    marginLeft: 6,
  },
  emailIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
    marginRight: 6,
  },
  passwordIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
    marginRight: 6,
    //padding: 15,
  },
  errorMessage: {
    fontFamily: fonts.outfitMedium,
    color: '#930000',
    width: 250,
    fontSize: 16,
    borderRadius: 8,
    left: 60,
    marginBottom: 10
  },
  box: {
    width: 212,
    height: 72,
    borderRadius: 13,
    backgroundColor: '#D9D9D9',
    opacity: 0.40,
    bottom: 45,
    marginHorizontal: 100,
    position: 'absolute'
  }

});

