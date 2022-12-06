import {
  Icon,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {Component, useState, useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const image = {
  uri: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=998&q=80',
};

const changeVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
};

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

    async function sendToDatabase() {
      //console.log(formData)
        // check if all fields are filled out
        if (!formData.username|| !formData.password) {
          setErrorMessage('All fields are required.');
          return;
        }

        await fetch('http://10.0.2.2:8000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }, 
            body: JSON.stringify(formData)
          }).then().catch(error=>console.log(error)).then(res => res.json()).then(
            //}).then().catch(error=>console.log(error)).then(
              data => {
                // alert("data: ", data.json);
                if(data.error) {
                  setErrorMessage(data.error);
                } else {
                  navigation.navigate('Tabs')
                }  
          }
        )
    
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Welcome Back!</Text>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <View style={styles.inputContainer}>
          <Image
            style={styles.userIcon}
            source={require('ItineraryApp/assets/icons/User_fill(1).png')}
          />
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={text => setFormData({...formData, username: text})}
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
        </View>
      </ImageBackground>
      <TouchableOpacity
        style={styles.button1}
        onPress={() => {
          sendToDatabase();
        }}>
        <Text style={styles.custom}>Login</Text>
      </TouchableOpacity>
      <View style={styles.box}></View>
      <View>
        <Text style={[styles.text, {bottom: 170}]}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupForm')}>
          <Text style={[styles.text2, {bottom: 165}]}>Sign up here.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: 790,
    width: 420,
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 38,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 17,
  },
  text2: {
    textAlign: 'center',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 17,
  },
  custom: {
    fontFamily: 'ABeeZee',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '80%',
    height: 45,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d7d7d7',
    marginHorizontal: 40,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: '#E8358B',
    width: 205,
    height: 56,
    bottom: 120,
    marginHorizontal: 100,
  },
  userIcon: {
    tintColor: '#000000',
    opacity: 0.45,
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  passwordIcon: {
    width: 30,
    height: 30,
    marginLeft: 5,
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
