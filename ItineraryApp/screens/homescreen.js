import {ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Button, SafeAreaView, Image, ActivityIndicator, FlatList } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import CustomAndroid from '../components/CustomAndroid';
//import List from '../components/List';
import SearchBar from '../components/SearchBar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StackNavigator, TabNavigator } from 'react-navigation';

const image = { uri: "https://images.unsplash.com/photo-1531850039645-b21522964b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80" };

const userName = "insertName";  //pull from database

const HomeScreen = ({navigation}) => {
  const[searchItem, setSearchItem] = useState("");
  const[clicked, setClicked] = useState(false);

  const [places, setPlaces] = useState([   //pull from database
    {key: '1', name: 'Item 1'},
    {key: '2', name: 'Item 2'},
    {key: '3', name: 'Item 3'},
    {key: '4', name: 'Item 1'},
    {key: '5', name: 'Item 2'},
    {key: '6', name: 'Item 3'},
    {key: '7', name: 'Item 1'},
    {key: '8', name: 'Item 2'},
    {key: '9', name: 'Item 3'}
])

const onPressHandler = () => {
    navigation.navigate('MoreInformation');
}

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.searchBar}></View>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}></ImageBackground>
      </View>
      {!clicked && <Text style={styles.title}></Text>}
      <SearchBar style={styles.searchBar}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        clicked={clicked}
        setClicked={clicked}
      />
      <Text style={styles.name}>Welcome Back, {userName}!</Text>
      <Text style={styles.categoryTitle}>Trending Destinations</Text>
      <FlatList
        style={styles.section}
        horizontal
        data={places}
        renderItem={({item, index}) => (
            <View>
                <Pressable
                onPress={onPressHandler}
           >
                   <View> 
                    <Text style={styles.description}>{item.name}</Text>
                </View>
              
            </Pressable>
            </View>
        )}
        />
    </SafeAreaView>
  )
}


export default HomeScreen


const styles = StyleSheet.create({
    container: {
      flex: 1
    },

    section: {
        margin: 30,
        top: 200,
    },

    description: {
        marginHorizontal: 30
    },

    root: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    name: {
      fontSize: 25,
      color: "white"
    },

    image: {
      flex: 1,
      height: 264,
      width: 415,
    },

    searchBar: {
      marginBottom: 15,
    },

    categoryTitle: {
      fontSize: 17,
      color: 'black',
      top: 160,
      right: 110
    }
  });