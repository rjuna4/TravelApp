import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { Component, useState } from 'react';

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
        <TextInput
          placeholder="Username"
          style={styles.input}
          //onChangeText={onChangeText}
          //value={}
        />
        </View>
        <View style={styles.inputContainer}>
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

class LoginForm extends Component {
  render(){
    return (
    <View style={styles.container}>

      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.custom}>Welcome Back!</Text>
         {inputField()}
        <Text style={styles.text}>Remember me?</Text>
        <Text style={styles.text}>Forgot username and/or password? Click here</Text>
      </ImageBackground>
      <TouchableOpacity style={styles.button2}>
          <Text style={styles.custom}>Login</Text>
        </TouchableOpacity>
    </View>  
    )  
  }
};
export default LoginForm

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: 610,
    width: 420,
  },
  text: {
    textAlign: "center",
    color: "#FFFFFF"
  },
  custom: {
    fontFamily: 'ABeeZee',
    fontSize: 38,
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
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: "#DA5263",
    width: 205,
    height: 56,
    marginBottom: 100,
    marginHorizontal: 100
  }
});