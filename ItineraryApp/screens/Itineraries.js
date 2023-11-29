import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, View, Text, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList, ScrollView, FlatList} from 'react-native';
import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItineraryContainer from 'ItineraryApp/components/ItineraryContainer';
import ActivityContainer from '../components/ActivityContainer';
import { getPlaceDetails } from '../api';
import HeaderBanner from '../components/HeaderBanner';
import imgOne from '../assets/appimages/Santorini.png'
//import { Text } from 'react-native-elements';
import { useLoadFonts, fonts } from '../components/FontLoader';
import ActivityRecommendations from './activityRecommendations';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import SearchBar from '../components/SearchBar';

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

const [tabColor, changeColor] = useState("#00F3C8");
const [tab2Color, changeColor2] = useState("#FFFFFF");
const [activeTab, setActiveTab] = useState(1);

const changeTab = (tabNum) => {
  setActiveTab(tabNum);
  changeColor(tabNum === 1 ? '#00F3C8' : "#00F3C8");
  changeColor2(tabNum === 2 ? '#00F3C8' : "#FFFFFF");

}

    return (
      <View style={styles.container}>
        <View>
          <HeaderBanner heading = "Itineraries" style={styles.banner}>
          </HeaderBanner>
        </View>
        <View style={styles.tabs}>
          <View style={styles.tabContainer}>
                <Text
                  style={[
                    styles.tab1,
                    {
                      color: activeTab === 1 ? tabColor : '#FFFFFF',
                    },
                  ]}
                  onPress={() => changeTab(1)}
                >
                  Plan A Trip
                </Text>
                {activeTab === 1 && (
                  <View style={styles.underline} />
                )}
              </View>
              <View style={styles.tabContainer}>
                <Text
                  style={[
                    styles.tabs,
                    {
                      color: activeTab === 2 ? tab2Color : '#FFFFFF',
                    }
                  ]}
                  onPress={() => changeTab(2)}
                >
                  My Trips
                </Text>
                {activeTab === 2 && (
                  <View style={styles.underline2} />
                )}
              </View>
            </View>

            <View>
            <SearchBar style ={styles.search}></SearchBar>
        </View>
        <View >
          <Text style={styles.tabs} onPress={changeTab}> Plan A Trip </Text>
          <Text style={styles.tabs} onPress={changeTab}> My Trips </Text>
        </View>
      
        <Text style={{color: '#FFFFFF', fontSize: 20}}>Trending Destinations</Text>
        <View style={{height: 270, backgroundColor: '#000000', marginTop: 10}}>
          <ScrollView horizontal={true}>
            <View style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'row', marginTop: 20}}>
              <View style={{display: 'flex', width: 302}}>
                <Image 
                  source={require('../assets/appimages/Seoul.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23 }}>
                    Seoul, South Korea
                  </Text>
                  <Text style={{fontSize: 14, color: '#D9D9D9', marginLeft: 23}}>
                    Seoul is a bewitching mix of ancient and modern, packaged in a surprisingly...
                  </Text>
              </View>
              <View style={{display: 'flex', width: 302}} onPress={() => navigation.navigate("ActivityRecommendations")}>
                  <Image 
                  source={require('../assets/appimages/Tokyo.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23 }}>
                    Tokyo, Japan
                  </Text>
                  <Text style={{fontSize: 14, color: '#D9D9D9', marginLeft: 23}}>
                    Tokyo, one of the world's largest cities, offers a uniquely eclectic mix of traditional...
                  </Text>
              </View>    
              <View style={{display: 'flex', width: 302}}>
                <Image 
                  source={require('../assets/appimages/Santorini.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23 }}>
                    Santorini, Greece
                  </Text>
                  <Text style={{fontSize: 14, color: '#D9D9D9', marginLeft: 23}}>
                  Santorini is a fantastic Cycladic island in the southern Aegean Sea with astonishing...
                  </Text>
              </View>   
              <View style={{display: 'flex', width: 302}}>
                <Image 
                  source={require('../assets/appimages/bangkok.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23 }}>
                    Bangkok, Thailand
                  </Text>
                  <Text style={{fontSize: 14, color: '#D9D9D9', marginLeft: 23}}>
                    Bangkok is the larger-than-life city where magnificent temples, historic markets...
                  </Text>
              </View>   
              <View style={{display: 'flex', width: 302}}>
                <Image 
                  source={require('../assets/appimages/newYork.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23 }}>
                    New York, USA
                  </Text>
                  <Text style={{fontSize: 14, color: '#D9D9D9', marginLeft: 23}}>
                    New York City is a major centre for international business and commerce and...
                  </Text>
              </View>   
              <View style={{display: 'flex', width: 302}}>
                <Image 
                  source={require('../assets/appimages/barcelona.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23 }}>
                    Barcelona, Spain
                  </Text>
                  <Text style={{fontSize: 14, color: '#D9D9D9', marginLeft: 23}}>
                    Barcelona is the second-largest metropolis in Spain and a world class city, vibrant...
                  </Text>
              </View>   
              <View style={{display: 'flex', width: 302}}>
                <Image 
                  source={require('../assets/appimages/bali.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23 }}>
                    Bali, Indonesia
                  </Text>
                  <Text style={{fontSize: 14, color: '#D9D9D9', marginLeft: 23}}>
                    Bali appeals through its sheer natural beauty of looming volcanoes and lush terraced...
                  </Text>
              </View>
              </View>
          </ScrollView>
        </View>
        <Text style={{color: '#FFFFFF', fontSize: 20, paddingTop: 10}}>Popular Attractions Worldwide</Text>
        <View style={{height: 270, marginTop: 10}}>
          <ScrollView horizontal={true}>
            <View style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'row', marginTop: 20}}>
              <View style={{display: 'flex', width: 302}} onPress={() => navigation.navigate("ActivityRecommendations", {param : data})}>
                  <Image 
                  source={require('../assets/appimages/colosseum.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23 }}>
                    Tokyo, Japan
                  </Text>
                  <Text style={{fontSize: 14, color: '#D9D9D9', marginLeft: 23}}>
                    Tokyo, one of the world's largest cities, offers a uniquely eclectic mix of traditional...
                  </Text>
              </View>    
              <View style={{display: 'flex', width: 302}}>
                <Image 
                  source={require('../assets/appimages/angkorWat.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23 }}>
                    Santorini, Greece
                  </Text>
                  <Text style={{fontSize: 14, color: '#D9D9D9', marginLeft: 23}}>
                  Santorini is a fantastic Cycladic island in the southern Aegean Sea with astonishing...
                  </Text>
              </View>   
           
              </View>
          </ScrollView>
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
    fontFamily: fonts.outfitMedium,
    fontSize: 18,
    color: "#FFFFFF",
    justifyContent: 'center',
    flexDirection: 'row',
    top: 10,
    marginHorizontal: 55,
  },
  tab1: {
    fontSize: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    top: 10,
    marginHorizontal: 55,
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
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underline: {
    height: 3, // Adjust the thickness here
    backgroundColor: '#00F3C8', // Adjust the color here
    position: 'absolute',
    top: 42,
    left: 49,
    right: 0,
    width: 110
  },
  underline2: {
    height: 3, // Adjust the thickness here
    backgroundColor: '#00F3C8', // Adjust the color here
    position: 'absolute',
    top: 42,
    left: 41,
    right: 0,
    width: 105
  },
  search: {
    width: 350
  }
})
