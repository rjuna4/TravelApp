
import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { Component, useState } from 'react';
import SearchBar from '../components/SearchBar';

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

class BookmarksScreen extends Component {
  render(){
    const HomeScreen = () => {
      const[searchItem, setSearchItem] = useState("");
      const[clicked, setClicked] = useState(false);
    
      return (
        <SafeAreaView style={styles.root}>
          <View style={styles.container}>
            <View style={styles.searchBar}></View>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            </ImageBackground>
          </View>
          {!clicked && <Text style={styles.title}></Text>}
          <SearchBar
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            clicked={clicked}
            setClicked={clicked}
          />
        </SafeAreaView>
      )
    }
    
    return (
    <View style={styles.container}>
        <Text style={styles.custom}>My Bookmarks</Text>      
    </View>  
    )  
  }
};
export default BookmarksScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  custom: {
    fontFamily: 'ABeeZee',
    fontSize: 38,
    color: "#744578",
    textAlign: "center",
  },
});