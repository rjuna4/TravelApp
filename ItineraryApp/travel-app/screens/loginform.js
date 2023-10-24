import {Icon, SafeAreaView, TextInput, ImageBackground, Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, } from 'react-native';
import React, {Component, useState, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { fonts } from '../components/FontLoader';

const image = {
  uri: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=998&q=80',
};

const localImage = require('travel-app/assets/appimages/loginBackground.png')

const LoginForm = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


//   async function sendToDatabase() {
//     //console.log(formData)
//       // check if all fields are filled out
//       if (!formData.username|| !formData.password) {
//         setErrorMessage('All fields are required.');
//         return;
//       }

//       await fetch('http://10.24.66.78:8081/api/login', {
//           method: 'POST',
//           headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',

//           }, 
//           body: JSON.stringify(formData)
//         }).then().catch(error=>console.log(error)).then(res => res.json()).then(
//           //}).then().catch(error=>console.log(error)).then(
//             data => {
//               // alert("data: ", data.json);
//               if(data.error) {
//                 setErrorMessage(data.error);
//               } else {
//                 navigation.navigate('Tabs')
//               }  
//         }
//       )
// }

async function sendToDatabase() {
  if (!formData.username || !formData.password) {
    setErrorMessage('All fields are required.');
    return;
  }

  // try {
    const response = await fetch('http://10.24.66.78:8081/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      //timeout: 30000,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.error) {
      setErrorMessage(data.error);
      console.log(errorMessage);
    } else {
      navigation.navigate('Tabs');
    }
  // } catch (error) {
  //   console.error('Network request error:', error);
  //   setErrorMessage('Network request error');
  // }
// }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={localImage} resizeMode="cover" style={styles.localImage}>
        <Text style={styles.title}>Welcome Back!</Text>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <View style={{bottom: 5}}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.userIcon}
            resizeMode="contain"
            source={require('travel-app/assets/icons/user.png')}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor='#FFFFFF'
            style={styles.input}
            onChangeText={text => setFormData({...formData, username: text})}
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
        </View>
        <View>
          <View style={styles.separator}/>
        </View>
        <View>
        <Text style={{fontSize: 15, color: '#FFFFFF', fontFamily: fonts.outfitRegular, left: 55, top: 5}}>Remember me?</Text>
        <Text style={{fontSize: 15, color: '#FFFFFF', fontFamily: fonts.outfitRegular, left: 55, top: 10, width: 265}}>Forgot username and/or password?</Text>
        <Text style={{fontSize: 15, color: '#FFFFFF', textDecorationLine: 'underline', fontFamily: fonts.outfitSemiBold, left: 55, top: 11}}>Click here.</Text>
        {/* <Text style={{fontSize: 17, color: '#FFFFFF', fontFamily: fonts.outfitRegular, left: 100, top: 20,}}>Click here.</Text> */}
        </View>
        
      
      <TouchableOpacity
        style={styles.button1}
        onPress={() => {
          sendToDatabase();
        }}>
        <Text style={styles.custom}>Login</Text>
      </TouchableOpacity>
      <View>
        <Text style={[styles.text, {top: 75}]}>Don't have an account?</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('SignupForm')}>
          <Text style={[styles.text2, {top: 80}]}>Sign up here.</Text>
        </TouchableOpacity> */}
      </View>
      </View>
      </ImageBackground>
    </View>
  );
};
export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  localImage: {
    flex: 1,
    justifyContent: "center",
    height: 812,
    width: 375,
  },
  title: {
    fontFamily: fonts.outfitMedium,
    fontSize: 45,
    color: '#007298',
    textAlign: 'center',
    bottom: 90,
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: fonts.outfitRegular,
  },
  text2: {
    textAlign: 'center',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontFamily: fonts.outfitSemiBold,
    fontSize: 17,
  },
  custom: {
    fontFamily: fonts.outfitRegular,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    //backgroundColor: 'white',
    width: '80%',
    height: 45,
    //borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: 2,
    borderColor: '#d7d7d7',
    marginHorizontal: 40,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: fonts.outfitRegular,
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#57C2AF',
    width: 160,
    height: 46,
    top: 50,
    marginHorizontal: 100,
  },
  userIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  passwordIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    marginRight: 8
  },
  separator: {
    height: 1,
    marginTop: -10,
    width: 270,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF'
  },
  errorMessage: {
    color: '#FFFFFF',
    width: 278,
    height: 50,
    fontSize: 18,
    borderRadius: 13,
    backgroundColor: '#DA5263',
    marginHorizontal: 70,
    marginBottom: 5,
    textAlign: 'center'
  },
  box: {
    width: 212,
    height: 72,
    borderRadius: 13,
    backgroundColor: '#D9D9D9',
    opacity: 0.40,
    bottom: 107,
    marginHorizontal: 100,
  },
});
