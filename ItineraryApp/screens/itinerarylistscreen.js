import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Image } from 'react-native';
import React, { Component, useState } from 'react';
import SearchBar from '../components/SearchBar';

const image = { uri: "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=998&q=80"};

const changeVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

}


class ItineraryListScreen extends Component {
  render(){
    return (
    <View style={styles.container}>
        <Text style={styles.custom}>My Itineraries</Text>
        <Image
          source={require('ItineraryApp/assets/icons/Add_round.png')}
          resizeMode='contain'
          style={{
            width: 46,
            height: 50,
          }}
        />    
    </View>  
    )  
  }
};
export default ItineraryListScreen

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