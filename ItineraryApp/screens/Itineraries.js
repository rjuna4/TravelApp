import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList, ScrollView, FlatList} from 'react-native';
import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItineraryContainer from 'ItineraryApp/components/ItineraryContainer';
import ActivityContainer from '../components/ActivityContainer';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
//import AsyncStorage from '@react-native-community/async-storage';
import { getPlaceDetails } from '../api';
import HeaderBanner from '../components/HeaderBanner';


const Itineraries = ({route}) => {
    const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);


    const [date, setDate] = useState([   //pull from api
    {key: '1', name: 'Item 1'},
    {key: '2', name: 'Item 2'},
    {key: '3', name: 'Item 3'},
    {key: '4', name: 'Item 1'},
    {key: '5', name: 'Item 2'},
    {key: '6', name: 'Item 3'},
    {key: '7', name: 'Item 1'},
    {key: '8', name: 'Item 2'},
    {key: '9', name: 'Item 3'},
    {key: '10', name: 'Item 3'}

])

const changeTab = () => {
  const [tabColor, changeColor] = useState("#FFFFFF");
  const bodyText = 'This is not really a bird nest.';

  const changeTab = () => {
    setTitleText("Bird's Nest [pressed]");
  }}

    return (
      <View style={styles.container}>
        <View>
          <HeaderBanner heading = "Itineraries" style={styles.banner}>
          </HeaderBanner>
        </View>

        <View >
          <Text style={styles.tabs} onPress={changeTab}> Plan A Trip </Text>
          <Text style={styles.tabs} onPress={changeTab}> My Trips </Text>
        </View>
    </View>  
    )  
  }

export default Itineraries

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232020",
  },
  banner: {
    justifyContent: "center",
  },
  tabs: {
    fontFamily: 'ABeeZee',
    fontSize: 18,
    color: "#FFFFFF"
  },
  activityImage: {
    width: '85%',
    height: 180,
    borderRadius: 13,
    marginHorizontal: 30,
    top: 20
  },
  name: {
    fontSize: 20,
    marginLeft: 25,
    top: '40%'
  },
  location: {
    marginLeft: 20,
    top: 16
  }
})
