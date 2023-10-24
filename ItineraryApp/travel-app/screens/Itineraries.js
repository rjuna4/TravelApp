import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, View, Text, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList, ScrollView, FlatList, Touchable} from 'react-native';
import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItineraryContainer from 'travel-app/components/ItineraryContainer';
import ActivityContainer from '../components/ActivityContainer';
import { getPlaceDetails } from '../api';
import HeaderBanner from '../components/HeaderBanner';
import imgOne from '../assets/appimages/Santorini.png'
//import { Text } from 'react-native-elements';
import font from '../assets/fonts/Outfit-Medium.ttf'
import ActivityRecommendations from './activityRecommendations';
import CreateItinerary from './CreateItinerary';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import SearchBar from '../components/SearchBar';

const Itineraries = ({route}) => {
    const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

const [myTripsContent, setContentArray] = useState([
  {
    id: 1,
    title: 'Indonesia Trip',
    imageSource: require('../assets/appimages/Indonesia.png'),
    date: 'June 14th - June 24th',
  },
  {
    id: 2,
    title: 'Europe Trip',
    imageSource: require('../assets/appimages/Europe.png'),
    date: 'July 27th - August 13th',
  },
  // add new object
]);

const addNewTrip = (newTrip) => {
  setContentArray([...myTripsContent, newTrip]);
};

const [tabColor, changeColor] = useState("#00F3C8");
const [tab2Color, changeColor2] = useState("#FFFFFF");
const [activeTab, setActiveTab] = useState(1);

const changeTab = (tabNum) => {
  setActiveTab(tabNum);
  changeColor(tabNum === 1 ? '#00F3C8' : "#00F3C8");
  changeColor2(tabNum === 2 ? '#00F3C8' : "#FFFFFF");
  if (tabNum === 2) {
    setMyTripsActive(true)
  }
  else if (tabNum === 1) {
    setMyTripsActive(false);
  }
}

const [searchQuery, setSearchQuery] = useState('');
const [filteredResults, setFilteredResults] = useState([...myTripsContent]);

const handleSearch = () => {
  const results = myTripsContent.filter((content) =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredResults(results);
};


const [isMyTripsActive, setMyTripsActive] = useState(false);

    return (
      <View style={styles.container}>
        <View>
          <View>
            <HeaderBanner heading = "Itineraries" style={styles.banner}>
              <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() => {navigation.navigate("CreateItinerary")
                    }}
                  >
                    <Image
                      source={require('../assets/appimages/Add_round.png')}
                      resizeMode='contain'
                      style={{ width: 80, height: 51}}
                    />
                </TouchableOpacity>
              </View>
            </HeaderBanner>
            <TouchableOpacity
              onPress={() => {navigation.navigate("CreateItinerary")
              }}
            >
              <Image
                source={require('../assets/appimages/Add_round.png')}
                resizeMode='contain'
                style={{ width: 80, height: 51 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabs}>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => {changeTab(1)}}>
                <Text
                  style={[
                    styles.tab1,
                    {
                      color: activeTab === 1 ? tabColor : '#FFFFFF',
                    },
                  ]}
                >
                  Plan A Trip
                </Text>
                </TouchableOpacity>
                {activeTab === 1 && (
                  <View style={styles.underline} />
                )}
              </View>
              <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => {changeTab(2)}}>
                <Text
                  style={[
                    styles.tabs,
                    {
                      color: activeTab === 2 ? tab2Color : '#FFFFFF',
                    }
                  ]}
                >
                  My Trips
                </Text>
                </TouchableOpacity>
                {activeTab === 2 && (
                  <View style={styles.underline2} />
                )}
              </View>
            </View>

      <View style={styles.contentContainer}>
        <View>
          {isMyTripsActive ? (
          <View>
            <View>
            <SearchBar placeholder="Search My Itineraries" 
              onChangeText={setSearchQuery}
              value={searchQuery}
              myTripsContent={myTripsContent}
              handleSearch={handleSearch}
              >
              </SearchBar>
              </View>
              <View style={styles.cards}>
                <ScrollView>
                  {searchQuery
                  ? filteredResults
                  .filter((content) =>
                    content.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((content, index) => (
                    <View key={index}>
                      <View key={index} style={{display: 'flex', width: 302, marginTop: 55, paddingBottom: 25, flexDirection: 'row', marginHorizontal: 20}}>
                      <Image
                        source={content.imageSource}
                        style={{width: 209, height: 144, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium'}}
                      />
                      <View style={styles.itineraryText}>
                        <Text style={{color: '#D9D9D9', fontSize: 18, alignSelf: 'center'}}>{content.title}</Text>
                        <Text style={{fontSize: 16, color: '#D9D9D9', alignSelf: 'center', padding: 10,}}>{content.date}</Text>
                      </View>
                    </View>
                    </View>
                    ))
                  : 
                  myTripsContent.map((content, index) => (
                    <View>
                    <View key={index} style={{display: 'flex', width: 302, marginTop: 55, paddingBottom: 25, flexDirection: 'row', marginHorizontal: 20}}>
                      <Image
                        source={content.imageSource}
                        style={{width: 209, height: 144, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium'}}
                      />
                      <View style={styles.itineraryText}>
                        <Text style={{color: '#D9D9D9', fontSize: 18, alignSelf: 'center'}}>{content.title}</Text>
                        <Text style={{fontSize: 16, color: '#D9D9D9', alignSelf: 'center', padding: 10,}}>{content.date}</Text>
                      </View>
                    </View>
                     <View style={styles.separator} />
                     </View>
                  ))}
                </ScrollView>
              </View>
          </View>
          ) : (
            <View>
            <SearchBar style={styles.search} placeholder="Where do you want to go?" > 
              </SearchBar> 
          <ScrollView >
            <Text style={{color: '#FFFFFF', fontSize: 20, marginTop: 55}}>Trending Destinations</Text>
          <View style={{height: 270, backgroundColor: '#000000', marginTop: 10}}>
            <ScrollView horizontal={true}>
              <View style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'row', marginTop: 20}}>
                <View style={{display: 'flex', width: 302}}>
                  <Image 
                    source={require('../assets/appimages/Seoul.png')}
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
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
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
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
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
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
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
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
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
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
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
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
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
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
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
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
                    style={{width: 282, height: 167, borderRadius: 4, paddingTop: 10, fontFamily: 'Outfit Medium', marginLeft: 20}} />
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
          </ScrollView>
          </View> 
          )}
          </View>
      </View>
    </View>
    )  
  }

export default Itineraries

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232020",
    position: 'relative'
  },
  banner: {
    //justifyContent: "center",
    zIndex: 0
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 50,
    zIndex: 15, // Set a higher zIndex than the header banner
  },
  tabs: {
    fontFamily: 'Outfit-Medium',
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
    height: 3,
    backgroundColor: '#00F3C8',
    position: 'absolute',
    top: 42,
    left: 49,
    right: 0,
    width: 110
  },
  underline2: {
    height: 3,
    backgroundColor: '#00F3C8',
    position: 'absolute',
    top: 42,
    left: 41,
    right: 0,
    width: 105
  },
  search: {
    width: 400,
  },
  contentContainer: {
    flex: 1
  },
  cards: {
    marginTop: 25,
  },
  itineraryText: {
    display: 'flex',
    flexDirection: "column",
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    width: 380,
    alignSelf: "center",
    backgroundColor: '#818181'
  }
})

