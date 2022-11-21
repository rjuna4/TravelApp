import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList, ScrollView} from 'react-native';
import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItineraryContainer from 'ItineraryApp/components/ItineraryContainer';
import ActivityContainer from '../components/ActivityContainer';
import { AsyncStorage } from '@react-native-async-storage/async-storage';


const BookmarksScreen = ({route}) => {
    const navigation = useNavigation();

    const[mainData, setMainData] = useState([])

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false,
       })
    }, []);

    const data = route?.params?.param

    {/*return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>My Bookmarks</Text>
      </View> 
      <View>
        
       </View>    
    </View> 
    )  */}

    return (
      <>
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.activityImage}
            source={
              {uri:
                data?.photo?.images?.large?.url 
                ? data?.photo?.images?.large?.url 
                : 'ItineraryApp/assets/icons/restaurant(1).png'}
            }
          />
            <View>
              <TouchableOpacity>
                <Image style={styles.backButton}
                  source={require('ItineraryApp/assets/icons/Refund_back.png')}
                 />   
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Image style={styles.addButton}
                  source={require('ItineraryApp/assets/icons/Map_fill.png')}
                 /> 
              </TouchableOpacity>
              <TouchableOpacity>
                <Image style={styles.saveButton}
                  source={require('ItineraryApp/assets/icons/Bookmark_fill(1).png')}
                 /> 
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.name}>{data?.name}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 3}}
                  source={require('ItineraryApp/assets/icons/Pin_fill.png')}
                />  
                 <Text style={styles.location}>{data?.location_string}</Text>
              </View>
             
            </View>
        </View>
      </ScrollView>  
      </>
    );
  }


  const retrieveBookmark = async () => {
    storage = AsyncStorage();
    await storage.getItem('bookmark').then(async (token) => {
      response = JSON.parse(token);
    })
  }

export default BookmarksScreen

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
  activityImage: {
    width: '85%',
    height: 200,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    marginHorizontal: 10,
    top: 10
  }
});