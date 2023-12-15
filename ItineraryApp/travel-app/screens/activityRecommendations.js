import {Component, useLayoutEffect, useState, useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, Pressable, Image, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Modal, Button, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DialogInput from 'react-native-dialog-input'
import Dialog from 'react-native-dialog'
import HeaderBanner from '../components/HeaderBanner';
//import AsyncStorage from '@react-native-community/async-storage'
import { getPlaceDetails } from 'travel-app/api/index.js';
import Itineraries from './Itineraries';
import SearchBar from '../components/SearchBar';
import ActivityContainer from '../components/ActivityContainer';
import FiltersScreen from './filtersScreen';
import CreateItinerary from './CreateItinerary';
import { useLoadFonts, fonts } from '../components/FontLoader';

const ActivityRecommendations = ({route}) => {
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  // const {placeData, placeDetails} = route.params;
  // console.log("placeData: " + placeData);
  // console.log("placeDetails: " + placeDetails);
  const { ne_lat, ne_lng, sw_lat, sw_lng, activityType, placeData } = route.params;

  // console.log("place data in Activity Recommendations: ", placeData);

  const toggleFilters = () => {
    setFiltersVisible(!isFiltersVisible);
  }


  const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
      }, []);


      //const[activityType, changeActivityType] = useState("attractions");
      const[searchItem, setSearchItem] = useState("");
      const[clicked, setClicked] = useState(false);
      const[loading, setLoading] = useState(false)
      //const[updated_ne_lat, set_updated_ne_lat] = useState(null);
      //const[updated_ne_lng, set_updated_ne_lng] = useState(null);
      //const[updated_sw_lat, set_updated_sw_lat] = useState(null);
      //const[updated_sw_lng, set_updated_sw_lng] = useState(null);
      
      
        useLayoutEffect(() => {
          navigation.setOptions({
              headerShown: false,
           })
        }, []);
        useEffect(() =>  {
          setLoading(true);
          if (placeData) {
            setMainData(placeData);
            setLoading(false);
            return;
          }
          console.log("Before API Call in Activity Recs:", { ne_lat, ne_lng, sw_lat, sw_lng });
          getPlaceDetails(ne_lat, ne_lng, sw_lat, sw_lng, activityType).then(data => {
            console.log("After API Call in Activity Recs:", {
              ne_lat,
              ne_lng,
              sw_lat,
              sw_lng,
            });
          setMainData(data);
          // setInterval(() => {
          // setLoading(false);
          // }, 3000)
          setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data", error);
            setLoading(false);
          });
          console.log("After API Call in Activity Recs:", { ne_lat, ne_lng, sw_lat, sw_lng });
        }, [ne_lat, ne_lng, sw_lat, sw_lng, activityType, placeData])

    // console.log("mainData: " + mainData);
    console.log("lat/lng in Activity Recs:", { ne_lat, ne_lng, sw_lat, sw_lng });
  
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => {
      setIsModalVisible(() => !isModalVisible)
    };

  
    const data = route?.params?.param

    console.log("placeData: ", placeData);
    console.log("description:  " + placeData[0]?.description);
    console.log("name: " + placeData[0]?.name);
  
    return (
      <>
      <ScrollView>
        <StatusBar style="dark-content" />
        <View style={styles.container}>
        <View>
          <HeaderBanner heading = "Recommendations" style={styles.banner}>
          <View>
              <TouchableOpacity onPress={() => navigation.navigate('Itineraries')}>
                <Image style={styles.backButton}
                  source={require('travel-app/assets/icons/Refund_back.png')}
                 />   
              </TouchableOpacity>
            </View>
          </HeaderBanner>
        </View>
          <SearchBar></SearchBar>
          <View>
            {/* <TouchableOpacity onPress={toggleFilters}>
              <Image style={styles.filterIcon}
                source ={require('travel-app/assets/icons/Filter.png')} 
              />
            </TouchableOpacity>   */}

            <FiltersScreen visible={isFiltersVisible} onClose={toggleFilters} />
          </View>
          <Image style={styles.activityImage}
            source={{ uri: placeData?.photo?.images?.large?.url }}
          />
         
            <View>
            </View>
        
        <View>
       <ScrollView>
       {loading ?
         <View>
           <ActivityIndicator visible ={loading} size="large" color="#A067A5" />
         </View> :
       <View style={styles.activitiesContainer}>
         {placeData?.length > 0 ? (
           <>
           {mainData?.map((data, i) => {
            //  console.log("data in map: ", data); 

             return (
             <ActivityContainer
               key={i}
               image={
                 placeData?.photo?.images?.medium?.url
               }
               name={placeData?.name}
               location={placeData?.location_string}
               data={placeData}
             />  
             );
              })}
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
          </View>
      </ScrollView>  
      </>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232020",
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    //marginBottom: 50
  },
  text: {
    fontFamily: fonts.outfitMediumRegular,
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 11,
  },
  pressed: {
    opacity: 0.75,
  },
  activityImage: {
    width: '95%',
    height: 260,
    borderRadius: 13,
    marginHorizontal: 10,
    top: 10
  },
  backButton: {
    width: 35,
    height: 35,
    tintColor: '#FFFFFF',
    marginTop: -235,
    marginHorizontal: 25,
  },
  addButton: {
    width: 35,
    height: 45,
    tintColor: '#FFFFFF',
    marginTop: -40,
    marginHorizontal: 25,
  },
  saveButton: {
    width: 30,
    height: 45,
    tintColor: '#FFFFFF',
    marginHorizontal: 355,
    marginTop: -45,
  },
  name: {
    fontSize: 30,
    marginTop: 7,
    marginHorizontal: 10,
    color: '#744578'
  },
  location: {
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 2,
  },
  ranking: {
    marginHorizontal: 5,
    fontSize: 18,
    marginTop: 5,
  },
  rating: {
    fontSize: 20,
  },
  priceLevel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  cuisine: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginHorizontal: 6,
  },

  modalContainer: {
    backgroundColor:"#FFFFFF", 
    margin: 50, 
    padding: 40, 
    borderRadius: 13, 
    flex:.35,
    top: 100,
    borderWidth: .5,
    borderColor: '#A067A5',
  },

  menuOptions: {
    borderRadius: 13,
    borderWidth: .5,
    borderColor: '#A067A5',
    marginBottom: 10,
    bottom: 12
  },

  box1: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: '#D9D9D9',
    opacity: 0.80,
    bottom: 45,
    position: 'absolute'
  },
  banner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterIcon: {
    width: 28,
    height: 28,
    marginTop: 70,
    marginLeft: 20
  }

  
});
export default ActivityRecommendations;


