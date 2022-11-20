{/*
import {ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Button, SafeAreaView, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { Component, useState, useLayoutEffect, useEffect } from 'react';
import CustomAndroid from '../components/CustomAndroid';
import { useNavigation } from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StackNavigator, TabNavigator } from 'react-navigation';

const image = { uri: "https://images.unsplash.com/photo-1531850039645-b21522964b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80" };
const userName = "insertName";  //pull from database
const HomeScreen = ({navigation}) => {
  const[searchItem, setSearchItem] = useState("");
  const[clicked, setClicked] = useState(false);
  const [places, setPlaces] = useState([   //pull from api
    {key: '1', name: 'Item 1'},
    {key: '2', name: 'Item 2'},
    {key: '3', name: 'Item 3'},
    {key: '4', name: 'Item 1'},
    {key: '5', name: 'Item 2'},
    {key: '6', name: 'Item 3'},
    {key: '7', name: 'Item 1'},
    {key: '8', name: 'Item 2'},
    {key: '9', name: 'Item 3'}
])

const onPressHandler = () => {
    navigation.navigate('MoreInformation');
}

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}></ImageBackground>
      </View>
      <View style ={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.navigate('ActivityRecommendations')}>
          <Image style={styles}
              source={require('../assets/icons/Search_alt.png')}
          />
        </TouchableOpacity>
        {!clicked && <Text style={styles.title}></Text>}
        <SearchBar style={styles.searchBar}
         searchItem={searchItem}
        setSearchItem={setSearchItem}
        clicked={clicked}
        setClicked={clicked}
        />
      </View>
      <Text style={styles.name}>Welcome Back, {userName}!</Text>
<Text style={styles.categoryTitle}>Trending Destinations</Text>
<FlatList
  style={styles.section}
  horizontal
  data={places}
  renderItem={({item, index}) => (
      <View>
          <Pressable
          onPress={onPressHandler}
     >
             <View>
              <Text style={styles.description}>{item.name}</Text>
          </View>
      </Pressable>
      </View>
  )}
  />
</SafeAreaView>
)
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  section: {
      margin: 30,
      top: 200,
  },

  description: {
      marginHorizontal: 30,
  },

  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: 25,
    color: "white"
  },

  image: {
    flex: .5,
    height: 264,
    width: 415,
  },

  categoryTitle: {
      fontSize: 17,
      color: 'black',
      top: 160,
      right: 110
    },

  searchBar: {
    top: 10,
  },

  searchBarIcon: {
    width: 33,
    height: 33,
    marginTop: 200,
    marginRight: 50,
  }

}); 

*/}


{/*}
import {ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Button, SafeAreaView, Image, ActivityIndicator, ScrollView, VirtualizedList } from 'react-native';
import React, { Component, useState, useLayoutEffect, useEffect } from 'react';
import CustomAndroid from '../components/CustomAndroid';
import ActivityMenu from '../components/ActivityMenu';
import ActivityContainer from '../components/ActivityContainer';
import { getPlaceDetails } from 'ItineraryApp/api/index.js';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const image = { uri: "https://images.unsplash.com/photo-1531850039645-b21522964b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80" };
const userName = "insertName";  //pull from database

const HomeScreen = ({navigation}) => {
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
        {/*<View style={styles.searchBar}></View> 
        <ImageBackground source={image} resizeMode="cover" style={styles.image}></ImageBackground>
      </View>
        {/* {!clicked && <Text style={styles.title}></Text>}
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
        {loading ? 
          <View>
            <ActivityIndicator visible ={loading} size="large" color="#08646B" />
          </View> :
        <ScrollView>
          {mainData?.length > 0 ? (
            <>
            {mainData?.map((data, i) => (
              <ActivityContainer
                key={i}
                image={
                  data?.photo?.images?.medium?.url 
                  ? data?.photo?.images?.medium?.url 
                  : 'ItineraryApp/assets/icons/restaurant(1).png'
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
            </ScrollView> }
  </SafeAreaView>  
  )
}


export default HomeScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    title: {
      fontSize: 25,
      color: '#FFFFFF',
      marginHorizontal: 100,
      top: 70,
      style: 'bold'
    },

    image: {
      flex: 1,
      justifyContent: "center",
      height: 240,
      width: 415,
    },
    activityMenu: {
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 9,
    },
    recommendations: {
      fontSize: 23,
      marginTop: 220,
      marginBottom: 10,
      marginLeft: 18,
      color: "#744578",
    },
    noResults: {
      fontSize: 20,
      marginLeft: 130,
      marginTop: 50,
    },
  list: {
      height: '100%',
      position: 'absolute',
      height: 35,
      width: 390,
      marginHorizontal : 10,
      top: 145
  }

  }); */}




import {ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Button, SafeAreaView, Image, ActivityIndicator, ScrollView, VirtualizedList } from 'react-native';
import React, { Component, useState, useLayoutEffect, useEffect } from 'react';
import CustomAndroid from '../components/CustomAndroid';
import ActivityMenu from '../components/ActivityMenu';
import ActivityContainer from '../components/ActivityContainer';
import { getPlaceDetails } from 'ItineraryApp/api/index.js';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 
const image = { uri: "https://images.unsplash.com/photo-1531850039645-b21522964b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80" };
 
 
const HomeScreen = ({data}) => {
 const navigation = useNavigation();
 const[activityType, changeActivityType] = useState("restaurants");
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
    <ScrollView>
     <View style={styles.container}>
       {/*<View style={styles.searchBar}></View> */}
       <ImageBackground source={image} resizeMode="cover" style={styles.image}>
       </ImageBackground>
     </View>
       {!clicked && <Text style={styles.title}></Text>}
       {/*<SearchBar style={styles.searchBar}
         searchItem={searchItem}
         setSearchItem={setSearchItem}
         clicked={clicked}
         setClicked={clicked}
 /> */}
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
       {loading ?
         <View>
           <ActivityIndicator visible ={loading} size="large" color="#08646B" />
         </View> :
       <View style={styles.activitiesContainer}>
         {mainData?.length > 0 ? (
           <>
           {mainData?.map((data, i) => (
             <ActivityContainer
               key={i}
               image={
                 data?.photo?.images?.medium?.url
                 ? data?.photo?.images?.medium?.url
                 : 'ItineraryApp/assets/icons/restaurant(1).png'
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
   },
 
   image: {
     flex: 1,
     justifyContent: "center",
     height: 250,
     width: 415,
   },
   text: {
     justifyContent: 'flex-start',
   },
   activityMenu: {
     justifyContent: 'center',
     flexDirection: 'row',
     justifyContent: 'space-evenly',
     marginTop: 10,
   },
   recommendations: {
     fontSize: 25,
     marginTop: -20,
     marginLeft: 30,
     color: "#744578",
   },
   noResults: {
     fontSize: 20,
     marginLeft: 130,
     marginTop: 50,
   },
    list: {
        height: '100%',
        position: 'absolute',
    },
    
    activitiesContainer: {
      flexDirection: 'column',

      
    }
 
 });














