import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList} from 'react-native';
import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import ItineraryContainer from 'travel-app/components/ItineraryContainer';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';

const image = { uri: "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=998&q=80"};

const changeVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

}


const ItineraryListScreen = () => {
    const navigation = useNavigation();
    const[title, setTitle] = useState(null);
    const[image, setImage] = useState(null);
    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
       })
    }, []);
    return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>My Itineraries</Text>
      </View>  
        <ItineraryContainer
          image={image}
          title={title}
        />
    </View>  
    )  
  }
export default ItineraryListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 38,
    color: "#744578",
    textAlign: "center",
    marginTop: 25,
  },
});