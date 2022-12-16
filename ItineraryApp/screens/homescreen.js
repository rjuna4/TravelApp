import {ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Button, SafeAreaView, Image, ActivityIndicator, ScrollView, VirtualizedList } from 'react-native';
import React, { Component, useState, useLayoutEffect, useEffect } from 'react';
import ActivityMenu from '../components/ActivityMenu';
import ActivityContainer from '../components/ActivityContainer';
import { getPlaceDetails } from 'ItineraryApp/api/index.js';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 
const image = { uri: "https://images.unsplash.com/photo-1531850039645-b21522964b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80" };
const userName = "insertName";  //pull from database
 
const HomeScreen = ({data}) => {
 const navigation = useNavigation();
 const[activityType, changeActivityType] = useState("attractions");
 const[searchItem, setSearchItem] = useState("");
 const[clicked, setClicked] = useState(false);
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
     setInterval(() => {
     setLoading(false);
     }, 3000)
     })
     }, [ne_lat, ne_lng, sw_lat, sw_lng, activityType])

 
 return (
  <SafeAreaView>
     <View style={styles.container}>
       <ImageBackground source={image} resizeMode="cover" style={styles.image}>
       </ImageBackground>
     </View>
     <Text style={styles.title}>Hello, {userName}!</Text>
     <View style={styles.list}>
           <GooglePlacesAutocomplete
               GooglePlacesDetailsQuery={{fields: 'geometry'}}
               style ={styles.container}
               placeholder="Where do you want to go?"
               query={{
                   key: 'AIzaSyAkWZoqmot4KRuIsGlZshMlJ1PV52fOYhk',
                   language: 'en'
               }}
               fetchDetails={true}
               onPress={(data, details = null) => {
                   console.log("data: ", data)
                   console.log("details: ", details)
                   console.log(JSON.stringify(details?.geometry?.viewport));
                   set_ne_lat(details?.geometry?.viewport?.northeast?.lat)
                   set_ne_lng(details?.geometry?.viewport?.northeast?.lng)
                   set_sw_lat(details?.geometry?.viewport?.southwest?.lat)
                   set_sw_lng(details?.geometry?.viewport?.southwest?.lng)
               }}
               onFail={error => console.log(error)}
               onNotFound={() => console.log('No search results found')}
               listEmptyComponent={() => (
                   <View style={{flex: 1}}>
                       <Text>No search results found</Text>
                   </View>
               )}   
           />
       </View>   
     {/*<Text style={styles.text}>Trending Destinations</Text>*/}
       <View>
         <Text style={styles.recommendations}>Recommendations</Text>
       </View>
       <View style={styles.activityMenu}>
         <ActivityMenu
           key={"restaurants"}
           name="Restaurants"
           image={require('ItineraryApp/assets/icons/restaurant(2).png')}
           activityType={activityType}
           changeActivityType={changeActivityType}
         />
         <ActivityMenu
           key={"attractions"}
           name="Attractions"
           image={require('ItineraryApp/assets/icons/beach.png')}
           activityType={activityType}
           changeActivityType={changeActivityType}
         />
         <ActivityMenu
           key={"hotels"}
           name="Hotels"
           image={require('ItineraryApp/assets/icons/hotel(2).png')}
           activityType={activityType}
           changeActivityType={changeActivityType}
         />
       </View>
       
       <View style={{top: 180}}>
       <ScrollView>
       {loading ?
         <View>
           <ActivityIndicator visible ={loading} size="large" color="#A067A5" />
         </View> :
       <View style={styles.activitiesContainer}>
         {mainData?.length > 0 ? (
           <>
           {mainData?.map((data, i) => (
             <ActivityContainer
               key={i}
               image={
                 data?.photo?.images?.medium?.url
                 //? data?.photo?.images?.medium?.url
                 //: 'ItineraryApp/assets/icons/restaurant(1).png'
               }
               name={data?.name}
               location={data?.location_string}
               data={data}
             />  
             ))}
             </>
             ) : (
             <>
               <View>
                 <Text style={styles.noResults}>No results found</Text>
               </View>
             </>
             )}
           </View> }
           </ScrollView>
           </View>
 </SafeAreaView> 
 )
}
 
 
export default HomeScreen
 
 
const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#FFFFFF",
   },
 
   title: {
    fontSize: 25,
    color: '#FFFFFF',
    marginHorizontal: 100,
    bottom: 160,
    style: 'bold'
  },
 
   image: {
     flex: 1,
     justifyContent: "center",
     height: 195,
     width: 415,
   },

   activityMenu: {
     justifyContent: 'center',
     flexDirection: 'row',
     justifyContent: 'space-evenly',
     marginTop: 10,
     top: 170
   },
   recommendations: {
     fontSize: 23,
     top: 170,
     marginLeft: 20,
     color: "#744578",
   },
   noResults: {
     fontSize: 20,
     marginHorizontal: 18,
     marginTop: 50,
   },
    list: {
        position: 'absolute',
        width: 390,
        marginHorizontal: 11,
        top: 140,
        zIndex: 2,
    },
    
    activitiesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      marginBottom: 500
    }
 
 });














