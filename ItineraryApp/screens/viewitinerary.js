import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList, ScrollView, FlatList} from 'react-native';
import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItineraryContainer from 'ItineraryApp/components/ItineraryContainer';
import ActivityContainer from '../components/ActivityContainer';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { getPlaceDetails } from '../api';

const image = { uri: "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=998&q=80"};

const ViewItinerary = ({route}) => {
    const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    getPlaceDetails();

    const data = route?.params?.param

    const [itineraryInfo, setItineraryInfo] = useState()
   
    const getDataFromStorage = async() => {
      let items = await AsyncStorage.getItem('itineraryInfo')
      items = JSON.parse(items)
      let itineraryInfo = []
      if (items) {
        console.log('arr', items)
        alert('items')
        items.forEach(data => {
          itineraryInfo.push(data)
          if(items.includes(data?.name)){
            itineraryInfo.push(data)
            return
          }
        })
        setItineraryInfo(itineraryInfo)
      } else {
        setItineraryInfo(false)
      }

    }

    setItineraryInfo(data);

    const data2 = getDataFromStorage();

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

<FlatList
            style={styles.section}
            horizontal
            data={data}
            renderItem={({item, index}) => (
                <View>
                    <View>
                        <Text style={styles.description}>{item}</Text>
                        <View> {item}</View>
                    </View>
                    <View>
                    </View>
                </View>
            )}
      />
          <View>
            {itineraryInfo ?
              itineraryInfo.map((data,index) => {
                return  {data}
              }) 
              : null}
            <Text style={styles.title}>My Itineraries</Text>
            <Text style={styles.title}> {}</Text>
          </View>
        <View>

        </View>
    
    </View>  
    )  
  }
export default ViewItinerary

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 38,
    color: "#744578",
    textAlign: "center",
    marginTop: 25,
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
});
