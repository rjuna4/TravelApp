import {Component, useLayoutEffect, useState, useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, Pressable, Image, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Modal, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DialogInput from 'react-native-dialog-input'
import Dialog from 'react-native-dialog'
//import AsyncStorage from '@react-native-community/async-storage'
import { getPlaceDetails } from 'travel-app/api/index.js';
import { useLoadFonts, fonts } from '../components/FontLoader';
import Itineraries from './Itineraries';
import ActivityRecommendations from './activityRecommendations';
import ActivityContainer from '../components/ActivityContainer';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';

const MoreInformation = ({route}) => {

    const [userId, setUserId] = useState('');
    const[mainData, setMainData] = useState([])
    var user_id;

    // async function loadUserId() {
    //   try {
    //     await AsyncStorage.getItem('user_id').then(value => console.log("user id in async storage after getItem: ", value));
    //     //user_id = value;
    //     //AsyncStorage.getItem('user_id').then(value => {user_id = value});

    //     // await AsyncStorage.getItem('user_id').then(function(value) {
    //     //   console.log("user ID after getItem: ", value); 
    //     //   //setUserId(value)
    //     // });
    //   } catch (e) {
    //       console.error('Failed to load user id.')
    //       console.log("e: ", e)
    //   }
    // }
    //console.log("user_id", user_id)

      // useEffect(() => {
      //   console.log("inside useEffect()")
      //     user_id = loadUserId().then((userId) => {
      //     })
      // }, [setUserId]) 

      const { ne_lat, ne_lng, sw_lat, sw_lng, activityType } = route.params;


      useEffect(() =>  {
        getPlaceDetails(ne_lat, ne_lng, sw_lat, sw_lng, activityType).then(data => {
        setMainData(data);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
          setLoading(false);
        });
      }, [ne_lat, ne_lng, sw_lat, sw_lng, activityType])

  console.log("mainData on more information screen: " + mainData);


  const data = route?.params?.param

  const latitude = data?.latitude;
  const longitude = data?.longitude;
  console.log("latitude: ", latitude);
  console.log("longitude: ", longitude);
    



  const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
      }, []);
  
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => {
      setIsModalVisible(() => !isModalVisible)
    };

    const onRegionChange = (region) => {
      console.log("region: ", region);
    }

  
    
    const [errorMessage, setErrorMessage] = useState(null);

    const [bookmarkData, setBookmarkData] = useState({
      userId: '6386857fce851928b24c6b4f',
      imageURL: data?.photo?.images?.medium?.url,
      title: data?.name,
    })

    async function saveUserBookmarks() {
      try {
        await AsyncStorage.setItem('user_id', bookmarkData.userId)
        await AsyncStorage.setItem('image_URL', bookmarkData.imageURL)
        await AsyncStorage.setItem('_title', bookmarkData.title)
      } catch (e) {
        console.error('Failed to save user id.')
        console.log("e: ", e)
      }
    }

    // async function sendBookmarkToDatabase() {


    //     setBookmarkData( {...bookmarkData, imageURL: data?.photo?.images?.medium?.url})
    //     setBookmarkData( {...bookmarkData, title:  data?.name})

        
    //     await fetch('http://10.0.2.2:8000/app/api/bookmarks', {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json',
    //           'Accept': 'application/json'
    //       }, 
    //       body: JSON.stringify(bookmarkData)
    //   }).then().catch(error=>console.log(error)).then(res => res.json()).then(
    //     data => {
    //       if(data.error) {
    //         alert("inside error")
    //         setErrorMessage(data.error);
    //         alert("data error: " + data.error)
    //         console.log("error")
    //       } else {
    //           saveUserBookmarks(data.user_id, data.image_URL, data._title)
    //           console.log("inside else statement")
    //           alert('Bookmark saved successfully');
    //       }
    //     }
    //   )
    // }

    const [itineraryData, setItineraryData] = useState({
      userId: '6386857fce851928b24c6b4f',
      imageURL: data?.photo?.images?.medium?.url,
      title: data?.name,
      time: ''
    })

    console.log("description:  " + data?.description);
    console.log("name: " + data?.name);
    // async function sendItineraryToDatabase() {
    //     if (!itineraryData.userId || !itineraryData.imageURL || !itineraryData.title || !itineraryData.time) {
    //       alert('Itinerary data does not exist');
    //       return;
    //     }
    //     setItineraryData( {...itineraryData, imageURL: data?.photo?.images?.medium?.url} )
    //     setItineraryData( {...itineraryData, title:  data?.name} )
    //     await fetch('http://10.0.2.2:8000/app/api/bookmarks', {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json',
    //           'Accept': 'application/json'
    //       }, 
    //       body: JSON.stringify(bookmarkData)
    //   }).then().catch(error=>console.log(error)).then(res => res.json()).then(
    //     data => {
    //       //alert("data.errror: ", data.error)
    //       if(data.error) {
    //         alert("inside error")
    //         setErrorMessage(data.error);
    //         alert("data error: " + data.error)
    //         console.log("error")
    //       } else {
    //           alert("inside else statement")
    //             //AsyncStorage.setItem('user_id', '63826e91c853c9f1a4566f65')
    //             alert("inside else statement")
    //             console.log("inside else statement")
    //         alert('Itinerary activity saved successfully');
    //       }
    //     }
    //   )
    // }

    useLoadFonts(); 

    return (
      <>
      <ScrollView style={{height: 1000}}>
        <StatusBar style="dark-content" />
        <View style={styles.container}>
          <Image style={styles.activityImage}
            source={{ uri: data?.photo?.images?.large?.url }}
          />
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Itineraries')}>
              {/* <View style={[styles.box1, {marginHorizontal: 18, marginBottom: 150}]}></View> */}
                <Image style={styles.backButton}
                  source={require('travel-app/assets/icons/backIcon.png')}
                 />   
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleModal()}>
              {/* <View style={[styles.box1, {marginHorizontal: 18, marginBottom: -50}]}></View> */}
                <Image style={styles.addButton}
                  source={require('travel-app/assets/icons/addToItinerary.png')}
                 /> 
              </TouchableOpacity>
                <Modal 
                  animationType="slide"
                  transparent={true}
                  height="150"
                  visible={isModalVisible}>
                    <View style={styles.modalContainer}>
                  <TouchableOpacity style={[styles.menuOptions]} onPress={() => navigation.navigate('ItineraryListScreen')}>
                    <Text style={[styles.text, {color:"#57C2AF"}]}>Add to Itinerary</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.menuOptions]} onPress={() => navigation.navigate('Iineraries')}>
                    <Text style={[styles.text, {color:"#57C2AF"}]}>Create new Itinerary</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.menuOptions]} onPress={() =>handleModal()}>
                    <Text style={[styles.text, {color:"#930000"}]}>Cancel</Text>
                  </TouchableOpacity>
                  </View>
                </Modal>
              <TouchableOpacity onPress={() => sendBookmarkToDatabase()}>
              {/* <View style={[styles.box1, {marginHorizontal: 345, marginBottom: -45}]}></View> */}
                <Image style={styles.saveButton}
                  source={require('travel-app/assets/icons/bookmarkIcon.png')}
                 /> 
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.name}>{data?.name}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 3, tintColor: '#E7BB20', width: 30, height: 30}}
                  source={require('travel-app/assets/icons/star-regular-24(1).png')}
                />  
                <Text style={styles.rating}>{data?.rating}</Text>
                <Text style={styles.priceLevel}>{data?.price_level}</Text>
              </View>
              <Text style={styles.ranking}>{data?.ranking}</Text>

              {data?.cuisine && (
                <View style={styles.cuisine}>
                      {data?.cuisine.map((n) => (
                  <View
                     key={n.key}
                  >
                  <Text style={{fontSize: 18}}>{n.name + ', '}</Text>
                </View>
                      ))}
              </View>
            )}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 3, tintColor: '#FFFFFF'}}
                  source={require('travel-app/assets/icons/Pin_fill.png')}
                />  
                <Text style={{fontSize: 17, color: '#FFFFFF', fontFamily: fonts.outfitBold}}>Location</Text>
              </View>
              <Text style={styles.location}>{data?.location_string}</Text>
            </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 5, tintColor: '#FFFFFF'}}
                  source={require('travel-app/assets/icons/File_dock.png')}
                />  
                <Text style={{fontSize: 17, color: '#FFFFFF', fontFamily: fonts.outfitBold}}>Description</Text>
              </View>
            <View>
              <Text style={styles.description} numberOfLines={10} renderTruncatedFooter>{data?.description}</Text>
            </View>
            <View>
              <MapView
                //provider="apple"
                style={{width: '90%', height: '50%', left: '5%', top: '5%', borderRadius: 4 }}
                onRegionChange={onRegionChange}
                initialRegion={{
                  latitude: data?.latitude,
                  longitude: data?.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
            >
              <Marker
                coordinate={{
                  latitude: data?.latitude,
                  longitude: data?.longitude
                }}
                title="Activity Marker"
                pinColor="#29927F" 
              >
              <Callout>
                <View>
                  <Text>{data?.name}</Text>
                </View>
              </Callout>
              </Marker>
            </MapView>
            </View>
            <View>
              <Text style={styles.price}>{data?.price}</Text>
              {/*<Text style={styles.hours}>{data?.hours}</Text> */}
            </View>
        </View>
      </ScrollView>  
      </>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 800,
    backgroundColor: '#322F2F',
  },
  text: {
    fontFamily: fonts.outfitRegular,
    fontSize: 18,
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
    top: 40
  },
  backButton: {
    width: 35,
    height: 35,
    tintColor: '#FFFFFF',
    marginTop: -210,
    marginHorizontal: 25,
  },
  addButton: {
    width: 30,
    height: 35,
    tintColor: '#FFFFFF',
    marginTop: -10,
    marginHorizontal: 25,
  },
  saveButton: {
    width: 22,
    height: 30,
    tintColor: '#FFFFFF',
    marginHorizontal: 330,
    marginTop: -30,
  },
  name: {
    fontSize: 24,
    fontFamily: fonts.outfitMedium,
    marginTop: 17,
    marginHorizontal: 10,
    color: '#57C2AF',
  },
  location: {
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 8,
    color: '#FFFFFF',
    fontFamily: fonts.outfitRegular,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 2,
    color: '#FFFFFF',
    fontFamily: fonts.outfitLight,
  },
  ranking: {
    marginHorizontal: 5,
    fontSize: 18,
    marginTop: 5,
    color: '#FFFFFF',
    fontFamily: fonts.outfitRegular,
  },
  rating: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: fonts.outfitRegular,
  },
  priceLevel: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#FFFFFF',
    fontFamily: fonts.outfitRegular,
  },
  cuisine: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginHorizontal: 6,
  },

  modalContainer: {
    backgroundColor:"#121010", 
    margin: 50, 
    padding: 40, 
    borderRadius: 13, 
    flex:.35,
    top: 150,
    borderWidth: .5,
    borderColor: '#57C2AF',
  },

  menuOptions: {
    borderRadius: 13,
    borderWidth: .5,
    borderColor: '#57C2AF',
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
  }

  
});
export default MoreInformation;


