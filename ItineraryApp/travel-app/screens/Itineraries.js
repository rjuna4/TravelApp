import React, { Component, useState, useLayoutEffect, useEffect} from 'react';
import {Icon, Animated, Button, SafeAreaView, TextInput, ImageBackground, StyleSheet, View, Text, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItineraryContainer from 'travel-app/components/ItineraryContainer';
import ActivityContainer from '../components/ActivityContainer';
import ActivityMenu from '../components/ActivityMenu';
import { getPlaceDetails } from '../api';
import HeaderBanner from '../components/HeaderBanner';
import imgOne from '../assets/appimages/Santorini.png'
//import { Text } from 'react-native-elements';
import ActivityRecommendations from './activityRecommendations';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useLoadFonts, fonts } from '../components/FontLoader';
import SearchBar from '../components/SearchBar';

const Itineraries = ({route, data}) => {
    const navigation = useNavigation();
    const[activityType, changeActivityType] = useState("attractions");
    // const[searchItem, setSearchItem] = useState("");
    // const[clicked, setClicked] = useState(false);
    const[mainData, setMainData] = useState([])
    const[loading, setLoading] = useState(false)
    const[ne_lat, set_ne_lat] = useState(null);
    const[ne_lng, set_ne_lng] = useState(null);
    const[sw_lat, set_sw_lat] = useState(null);
    const[sw_lng, set_sw_lng] = useState(null);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);
useEffect(() =>  {
  setLoading(true);
  getPlaceDetails(ne_lat, ne_lng, sw_lat, sw_lng, activityType).then(data => {
  setMainData(data);
  setLoading(false);
  })
  .catch(error => {
    console.error("Error fetching data", error);
    setLoading(false);
  });
  }, [ne_lat, ne_lng, sw_lat, sw_lng, activityType]);

  const [scrollX, setScrollX] = useState(new Animated.Value(0));

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } } ],
    { useNativeDriver: false}
  );

const {itineraryData,} = route.params || {itineraryData: [] };

const [tabColor, changeColor] = useState("#00F3C8");
const [tab2Color, changeColor2] = useState("#FFFFFF");
const [activeTab, setActiveTab] = useState(1);

const changeTab = (tabNum) => {
  setActiveTab(tabNum);
  changeColor(tabNum === 1 ? '#00F3C8' : "#00F3C8");
  changeColor2(tabNum === 2 ? '#00F3C8' : "#FFFFFF");
}

    useLoadFonts(); 
    

    return (
      <View style={styles.container}>
        <View>
          <View>
            <HeaderBanner heading = "Itineraries" style={styles.banner}>
              <View style={styles.iconContainer}>
                  {/* <TouchableOpacity
                    onPress={() => navigation.navigate("CreateItinerary",  {
                      itineraryData: itineraryData})}>
                    <Image
                      source={require('../assets/appimages/Add_round.png')}
                      resizeMode='contain'
                      style={{ width: 80, height: 59}}
                    />
                </TouchableOpacity> */}
              </View>
            </HeaderBanner>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateItinerary")}>
              <Image
                source={require('../assets/icons/Add_round.png')}
                resizeMode='contain'
                style={{ width: 80, height: 51 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabs}>
            <View style={styles.tabContainer}>
                  <Text
                    style={[
                      styles.tabs,
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
            
            <View style={styles.list}>
            {/* <SearchBar style ={styles.search}> */}
              <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: 'geometry'}}
                style={styles.searchBar}
                styles={{
                  textInputContainer: {
                    borderRadius: 20,
                    width: 350,
                  },
                  textInput: {
                    borderRadius: 25,
                  },
                  row: {
                    width: 350
                  },
                  poweredContainer: {
                    width: 350,
                  }
                }}
                placeholder="Where do you want to go?"
                query={{
                    key: 'AIzaSyAkWZoqmot4KRuIsGlZshMlJ1PV52fOYhk',
                    language: 'en' 
                }}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    console.log("this is the logged data: ", data)
                    //console.error("data: " + data);
                    console.log("these are the logged details: ", details);
                    //console.error("details", details);
                    console.log(JSON.stringify(details?.geometry?.viewport));
                    set_ne_lat(details?.geometry?.viewport?.northeast?.lat)
                    set_ne_lng(details?.geometry?.viewport?.northeast?.lng)
                    set_sw_lat(details?.geometry?.viewport?.southwest?.lat)
                    set_sw_lng(details?.geometry?.viewport?.southwest?.lng)
                    console.log(activityType);
                    console.log("this is data again: " , data);
                    console.log("this is main data again: " , mainData);
                    // navigation.navigate('ActivityRecommendations', {placeData: data, placeDetails: details});
                    navigation.navigate('ActivityRecommendations', {
                      //screen: 'ActivityRecommendations',
                      placeData: mainData,
                      ne_lat,
                      ne_lng,
                      sw_lat,
                      sw_lng,
                      activityType,
                    });
                }}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('No search results found')}
                listEmptyComponent={() => (
                    <View style={{flex: 1}}>
                        <Text>No search results found</Text>
                    </View>
                )}   
              />  
            {/* </SearchBar> */}
        </View>
        
        <View style={{marginTop: 100}}>
        <ScrollView>
          <Text style={styles.heading}>Trending Destinations</Text>
        <View style={{height: 270, backgroundColor: '#000000', marginTop: 10}}>
          <Animated.ScrollView
            horizontal={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
          <ScrollView horizontal={true}>
            <View style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'row', marginTop: 20}}>
              <View style={{display: 'flex', width: 302}}>
                <TouchableOpacity onPress={() => navigation.navigate("ActivityRecommendations")}>
                  <Image 
                    source={require('../assets/appimages/Seoul.png')}
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                    <Text style={styles.locationTitle}>
                      Seoul, South Korea
                    </Text>
                    <Text style={styles.locationDescription}>
                      Seoul is a bewitching mix of ancient and modern, packaged in a surprisingly...
                    </Text>
                  </TouchableOpacity>
              </View>
              <View style={{display: 'flex', width: 302}}>
                <TouchableOpacity onPress={() => navigation.navigate("ActivityRecommendations")}>
                    <Image 
                    source={require('../assets/appimages/Tokyo.png')}
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                    <Text style={styles.locationTitle}>
                      Tokyo, Japan
                    </Text>
                    <Text style={styles.locationDescription}>
                      Tokyo, one of the world's largest cities, offers a uniquely eclectic mix of traditional...
                    </Text>
                </TouchableOpacity>
              </View>    
              <View style={{display: 'flex', width: 302}}>
                <TouchableOpacity onPress={() => navigation.navigate("ActivityRecommendations")}>
                  <Image 
                    source={require('../assets/appimages/Santorini.png')}
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
                    <Text style={styles.locationTitle}>
                      Santorini, Greece
                    </Text>
                    <Text style={styles.locationDescription}>
                    Santorini is a fantastic Cycladic island in the southern Aegean Sea with astonishing...
                    </Text>
                  </TouchableOpacity>  
              </View>   
              <View style={{display: 'flex', width: 302}}>
                <TouchableOpacity onPress={() => navigation.navigate("ActivityRecommendations")}>
                  <Image 
                    source={require('../assets/appimages/bangkok.png')}
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
                    <Text style={styles.locationTitle}>
                      Bangkok, Thailand
                    </Text>
                    <Text style={styles.locationDescription}>
                      Bangkok is the larger-than-life city where magnificent temples, historic markets...
                    </Text>
                  </TouchableOpacity>  
              </View>   
              <View style={{display: 'flex', width: 302}}>
                <TouchableOpacity onPress={() => navigation.navigate("ActivityRecommendations")}>
                  <Image 
                    source={require('../assets/appimages/newYork.png')}
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                    <Text style={styles.locationTitle}>
                      New York, USA
                    </Text>
                    <Text style={styles.locationDescription}>
                      New York City is a major centre for international business and commerce and...
                    </Text>
                  </TouchableOpacity>  
              </View>   
              <View style={{display: 'flex', width: 302}}>
                <TouchableOpacity onPress={() => navigation.navigate("ActivityRecommendations")}>
                  <Image 
                    source={require('../assets/appimages/barcelona.png')}
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                    <Text style={styles.locationTitle}>
                      Barcelona, Spain
                    </Text>
                    <Text style={styles.locationDescription}>
                      Barcelona is the second-largest metropolis in Spain and a world class city, vibrant...
                    </Text>
                  </TouchableOpacity>  
              </View>   
              <View style={{display: 'flex', width: 302}}>
                <TouchableOpacity onPress={() => navigation.navigate("ActivityRecommendations")}>
                  <Image 
                    source={require('../assets/appimages/bali.png')}
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: fonts.outfitMedium, marginLeft: 20}} />
                    <Text style={styles.locationTitle}>
                      Bali, Indonesia
                    </Text>
                    <Text style={styles.locationDescription}>
                      Bali appeals through its sheer natural beauty of looming volcanoes and lush terraced...
                    </Text>
                  </TouchableOpacity>  
              </View>
              </View>
          </ScrollView>
          </Animated.ScrollView>
        </View>
        <Text style={styles.heading}>Popular Attractions Worldwide</Text>
        <View style={{height: 270, marginTop: 10}}>
          <ScrollView horizontal={true}>
            <View style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'row', marginTop: 20}}>
              <View style={{display: 'flex', width: 302}} onPress={() => navigation.navigate("ActivityRecommendations", {param : data})}>
                  <Image 
                  source={require('../assets/appimages/colosseum.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23, fontFamily: fonts.outfitMedium }}>
                    The Colosseum
                  </Text>
              </View>    
              <View style={{display: 'flex', width: 302}}>
                <Image 
                  source={require('../assets/appimages/angkorWat.png')}
                  style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, marginLeft: 20}} />
                  <Text style={{color: '#00F3C8', fontSize: 18, alignSelf: 'flex-start', paddingTop: 5, marginLeft: 23, fontFamily: fonts.outfitMedium }}>
                    Angkor Wat
                  </Text>
              </View>   
           
              </View>
          </ScrollView>
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

  list: {
    position: 'absolute',
    width: 390,
    marginHorizontal: 11,
    top: 140,
    zIndex: 2,
  },

  searchBar: {
    borderRadius: 10,
  },

  heading: {
    color: '#FFFFFF', 
    fontSize: 20,
    fontFamily: fonts.outfitBold,
  },
  
  locationTitle: {
    color: '#00F3C8', 
    fontSize: 18, 
    alignSelf: 'flex-start', 
    paddingTop: 5, 
    marginLeft: 23,
    fontFamily: fonts.outfitMedium,
  },

  locationDescription: {
    fontSize: 14, 
    color: '#D9D9D9',
    marginLeft: 23,
    fontFamily: fonts.outfitRegular,
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
    fontFamily: 'Outfit Medium',
    fontSize: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    top: 10,
    marginHorizontal: 55,
  },
  selectedImage: {
    width: 209,
    height: 144,
    borderRadius: 4,
    marginLeft: 10,
    marginTop: 10,
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
