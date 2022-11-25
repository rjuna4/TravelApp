{/*}

import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, Image, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { Component, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const localImage = require('ItineraryApp/assets/appimages/signupformbackground.png')

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
          placeholder="Full Name"
          style={styles.input}
          //onChangeText={onChangeText}
          //value={}
        />
        </View>
        <View style={styles.inputContainer}>
        <Image style={styles.emailIcon}
                source={require('ItineraryApp/assets/icons/Message_alt_fill.png')}
        />   
        <TextInput
          placeholder="Email Address"
          style={styles.input}
          //onChangeText={onChangeText}
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
        />
        <Icon style={{ paddingRight: 15, }}
        name={secure ? "eye" : 'eye-slash'}
        size={20} color='gray' 
        onPress={() => setSecure(!secure)} />
        } 
        </View>
        <View style={styles.inputContainer}>
        <Image style={styles.passwordIcon}
                source={require('ItineraryApp/assets/icons/Lock_fill.png')}
        />       
        <TextInput
          //onChangeText={(value) => console.log(value)}
          placeholder=" Confirm Password"
          secureTextEntry
          secure={true}
        />
        {
        <Icon style={{ paddingRight: 15, }}
        name={secure ? "eye" : 'eye-slash'}
        size={20} color='gray' 
        onPress={() => setSecure(!secure)} />
        } 
        </View>

      </SafeAreaView>
    );
  };

const SignupForm = ({navigation}) => {
    return (
    <View style={styles.container}>
      <ImageBackground source={localImage} resizeMode="cover" style={styles.localImage}>
        <Text style={styles.title}>Create an Account</Text>
         {inputField()}
      </ImageBackground>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tabs')}>
          <Text style={styles.custom}>Sign Up</Text>
      </TouchableOpacity>
        <Text style={[styles.text, {bottom: 80} ]}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
          <Text style={[styles.text2, {bottom: 80} ]}>Login here.</Text>
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
    width: 278,
    height: 40,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d7d7d7',
    marginHorizontal: 65,
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: "#CE80D4",
    width: 205,
    height: 56,
    bottom: 90,
    marginHorizontal: 105,
  },
  userIcon: {
    tintColor: '#000000',
    opacity: 0.45,
    width: 25,
    height: 25,
    marginLeft: 5
  },
  emailIcon: {
    width: 25,
    height: 25,
    marginLeft: 5
  },
  passwordIcon: {
    width: 25,
    height: 25,
    marginLeft: 5
  },
}); */}




import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, Image, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { Component, useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { response } from 'express';

const localImage = require('ItineraryApp/assets/appimages/signupformbackground.png')

const changeVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

}

const SignupForm = () => {
  const navigation = useNavigation();

  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: ' ',
    username: ' ',
    emailAddress: ' ',
    password: ' ',
    confirmPassword: ' '
  })


  const sendToDatabase = () => {
    //console.log(formData)
      // check if all fields are filled out
      if (formData.fullName == '' || formData.username == '' || formData.emailAddress == '' || formData.password == '' || formData.confirmPassword == '') {
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
      fetch('http://10.0.2.2:8000/api/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
    }).then().catch(error=>console.log(error)).then(res => res.json()).then(
      data => {
        if(data.error) {
          setErrorMessage(data.error);
        } else {
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
         {
          errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null
        }
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
        <Text style={styles.text2}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
          <Text style={styles.text2}>Login here.</Text>
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
    marginBottom: 45,
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
    marginHorizontal: 65,
    marginTop: 5,
    marginBottom: 5,
    bottom: -50
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
    marginBottom: 75,
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
    width: 280,
    height: 70,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#DA5263',
    marginHorizontal: -125,
    marginTop: -95,
    top: -30
  }
});










