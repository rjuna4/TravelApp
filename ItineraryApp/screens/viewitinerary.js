import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Image, FlatList } from 'react-native';
import React, { Component, useState, useLayoutEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const image = { uri: "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=998&q=80"};

const ViewItinerary = () => {
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
    return (
    <View style={styles.container}>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("ItineraryListScreen")}>
                <Image 
                    source = {require('ItineraryApp/assets/icons/Refund_back.png')} 
                    style={{tintColor: '#000000'}}>   
                </Image>
            </TouchableOpacity>    
        </View>
        <FlatList
            style={styles.section}
            horizontal
            data={date}
            renderItem={({item, index}) => (
                <View>
                    <View>
                        <Text style={styles.description}>{item.name}</Text>
                    </View>
                    <View>
                    </View>
                </View>
            )}
      />
    </View>  
    )  
  }
export default ViewItinerary

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
  description: {
    marginHorizontal: 30,
  },
  section: {
    margin: 30,
    top: 200,
  }
});