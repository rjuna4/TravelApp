import {ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Button, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import React, { Component, useState, useLayoutEffect, useEffect } from 'react';
import CustomAndroid from '../components/CustomAndroid';
import { useNavigation } from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';

import SearchBar from '../components/SearchBar';

const image = { uri: "https://images.unsplash.com/photo-1531850039645-b21522964b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80" };


const HomeScreen = () => {
  const[searchItem, setSearchItem] = useState("");
  const[clicked, setClicked] = useState(false);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
      }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.photo}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        </ImageBackground>
      </View>
      <View style ={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.navigate('ActivityRecommendations')}>
          <Image style={styles.searchBarIcon}
              source={require('../assets/icons/Search_alt.png')}
          />
        </TouchableOpacity>
        {!clicked && <Text style={styles.title}></Text>}
        <SearchBar style={styles.searchBar}
        />
      </View>
      <Text style={styles.text}>Trending Destinations</Text>
    </SafeAreaView>
  )
}


export default HomeScreen


const styles = StyleSheet.create({
    photo: {
      flex: 1
    },

    root: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    title: {
      fontSize: 25,
    },

    image: {
      flex: 1,
      justifyContent: "center",
      height: 264,
      width: 415,
    },

    searchBar: {
      marginBottom: 15,
    }, 

    searchBarIcon: {
      width: 33,
      height: 33,
      marginTop: 200,
      marginRight: 50,
    },

    text: {
      justifyContent: 'flex-start',
      color: '#000000'
      
    }

  

  });