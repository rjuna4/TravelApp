import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList, ScrollView} from 'react-native';
import React, { Component, useState, useEffect, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItineraryContainer from 'ItineraryApp/components/ItineraryContainer';
import ActivityContainer from '../components/ActivityContainer';
//import AsyncStorage from '@react-native-community/async-storage'


const BookmarksScreen = ({route}) => {

  const data = route?.params?.param
  console.log("data route params param", data);
  const [errorMessage, setErrorMessage] = useState(null);

  const [bookmarkData, setBookmarkData] = useState({
    userId: '6386857fce851928b24c6b4f',
    imageURL: data?.photo?.images?.medium?.url,
    title: data?.name,
  })


  async function getFromDatabase() {

    console.log("data name", bookmarkData.title)
    console.log("data image", bookmarkData.imageURL)
    console.log("user id bookmark data: ", bookmarkData.userId)

    setBookmarkData( {...bookmarkData, imageURL: data?.photo?.images?.medium?.url})
    setBookmarkData( {...bookmarkData, title: data?.name})

    console.log("inside getFromDatabase")

      const user_id = '6386857fce851928b24c6b4f';
      alert("user_id: ", user_id )
      await fetch(`http://10.0.2.2:8000/app/api/${user_id}/bookmarks`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }, 
    }).then().catch(error=>console.log(error)).then(res => res.json()).then(
      data => {
        alert("data.errror: ", data.error)
        console.log("data.error: ", data.error)
        if(data.error) {

          setErrorMessage(data.error);
          alert("data error: " + data.error)
        } else {
              //AsyncStorage.setItem('user_id', '63826e91c853c9f1a4566f65')
            alert('Bookmark retrieved successfully');

        }
      }
    )
  }
  useEffect(() => {
    console.log("inside useEffect() on bookmarks screen")
    getFromDatabase();
    console.log("after get from database")
  }, []) 

    const navigation = useNavigation();

    const[mainData, setMainData] = useState([])

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
       })
    }, []);

    return (
      <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>My Bookmarks</Text>
          </View> 
          <Image style={styles.activityImage}
            source={ {uri: data?.photo?.images?.large?.url }}
          />
          <View style={{marginLeft: 10, marginTop: 3}}>
              <Text style={styles.name}>{data?.name}</Text>         
            </View>
        </View>
      </ScrollView>  
      </>
    );
  }


  // const retrieveBookmark = async () => {
  //   storage = AsyncStorage();
  //   await storage.getItem('bookmark').then(async (token) => {
  //     response = JSON.parse(token);
  //   })
  // }

export default BookmarksScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Outfit-Medium',
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