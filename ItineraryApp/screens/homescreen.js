import {ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Button, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import CustomAndroid from '../components/CustomAndroid';
import List from '../components/List';
import SearchBar from '../components/SearchBar';
import StackNavigator from '../components/StackNavigator';

const image = { uri: "https://images.unsplash.com/photo-1531850039645-b21522964b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80" };


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
      <SearchBar style={styles.searchBar}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        clicked={clicked}
        setClicked={clicked}
      />
      <Text style={styles.text}>Trending Destinations</Text>
    </SafeAreaView>
  )
}


export default HomeScreen


const styles = StyleSheet.create({
    container: {
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
    text: {
      justifyContent: 'flex-start',
      
    }

  

  });