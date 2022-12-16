import {Component, useLayoutEffect, useState, useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, Pressable, Image, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Modal, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapTest from './mapsTest';
import DialogInput from 'react-native-dialog-input'
import Dialog from 'react-native-dialog'
import AsyncStorage from '@react-native-community/async-storage'
import { getPlaceDetails } from 'ItineraryApp/api/index.js';

//function map() { new Map();}

function MoreInformation({route}) {

    async function saveUserId(userId) {
      alert("inside saveUserId, userId: " + userId)
      try {
        await AsyncStorage.setItem('user_id', userId)
        alert('user_id from async storage', AsyncStorage.setItem('user_id'))
        setUserId(userId)
        alert("user id after setting", userId)
      } catch (e) {
        console.error('Failed to save user id.')
        console.log("e: ", e)
      }
    }

    const [userId, setUserId] = useState('');
    var user_id;

    async function loadUserId() {
      try {
        await AsyncStorage.getItem('user_id').then(value => console.log("user id in async storage after getItem: ", value));
        //user_id = value;
        //AsyncStorage.getItem('user_id').then(value => {user_id = value});

        // await AsyncStorage.getItem('user_id').then(function(value) {
        //   console.log("user ID after getItem: ", value); 
        //   //setUserId(value)
        // });
      } catch (e) {
          console.error('Failed to load user id.')
          console.log("e: ", e)
      }
    }
    //console.log("user_id", user_id)

      useEffect(() => {
        console.log("inside useEffect()")
          user_id = loadUserId().then((userId) => {
          })
      }, [setUserId]) 
  

    // //var user_id;
    // const asyncResult = async function loadUserId() {
    //   try {
    //     await AsyncStorage.getItem('user_id').then(value => console.log("async storage user id after getItem: ", value));
    //     //AsyncStorage.getItem('user_id').then(value => {user_id = value});

    //     // await AsyncStorage.getItem('user_id').then(function(value) {
    //     //   console.log("user ID after getItem: ", value); 
    //     //   //setUserId(value)
    //     asyncResult = value;
    //     // });
    //     return value;
    //   } catch (e) {
    //       //console.error('Failed to load user id.')
    //       //console.log("e: ", e)
    //       throw new Error("async await failed")
    //   }
    // }
    
    // console.log(`async result = ${asyncResult}` )
    // console.log(asyncResult);

    // asyncResult = await loasUserId();


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

  
    const data = route?.params?.param

    const [errorMessage, setErrorMessage] = useState(null);

    const [bookmarkData, setBookmarkData] = useState({
      userId: '6386857fce851928b24c6b4f',
      imageURL: data?.photo?.images?.medium?.url,
      title: data?.name,
    })

    async function saveUserBookmarks(userId, imageURL, title) {
      try {
        await AsyncStorage.setItem('user_id', bookmarkData.userId)
        //alert('user_id from async storage', bookmarkData.userId )
        await AsyncStorage.setItem('image_URL', bookmarkData.imageURL)
        //alert('image_URL from async storage', bookmarkData.imageURL)
        await AsyncStorage.setItem('_title', bookmarkData.title)
        //alert('_title from async storage', bookmarkData.title)
        //alert('_title from async storage', AsyncStorage.setItem('_title'))
      } catch (e) {
        console.error('Failed to save user id.')
        console.log("e: ", e)
      }
    }

    async function sendBookmarkToDatabase() {


        console.log("data route", data)
        console.log("data name", bookmarkData.title)
        console.log("data image", bookmarkData.imageURL)
        console.log("user id bookmark data: ", bookmarkData.userId)


        setBookmarkData( {...bookmarkData, imageURL: data?.photo?.images?.medium?.url})
        setBookmarkData( {...bookmarkData, title:  data?.name})

        
        await fetch('http://10.0.2.2:8000/app/api/bookmarks', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }, 
          body: JSON.stringify(bookmarkData)
      }).then().catch(error=>console.log(error)).then(res => res.json()).then(
        data => {
          if(data.error) {
            alert("inside error")
            setErrorMessage(data.error);
            alert("data error: " + data.error)
            console.log("error")
          } else {
              saveUserBookmarks(data.user_id, data.image_URL, data._title)
              console.log("data.user_id", data.user_id)
              console.log("data.user_id", data.image_URL)
              console.log("data.user_id", data._title)
               
              console.log("inside else statement")
            alert('Bookmark saved successfully');
          }
        }
      )
    }

    const [itineraryData, setItineraryData] = useState({
      userId: '6386857fce851928b24c6b4f',
      imageURL: data?.photo?.images?.medium?.url,
      title: data?.name,
      time: ''
    })


    async function sendItineraryToDatabase() {
        if (!itineraryData.userId || !itineraryData.imageURL || !itineraryData.title || !itineraryData.time) {
          alert('Itinerary data does not exist');
          return;
        }
        setItineraryData( {...itineraryData, imageURL: data?.photo?.images?.medium?.url} )
        setItineraryData( {...itineraryData, title:  data?.name} )
        await fetch('http://10.0.2.2:8000/app/api/bookmarks', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }, 
          body: JSON.stringify(bookmarkData)
      }).then().catch(error=>console.log(error)).then(res => res.json()).then(
        data => {
          //alert("data.errror: ", data.error)
          if(data.error) {
            alert("inside error")
            setErrorMessage(data.error);
            alert("data error: " + data.error)
            console.log("error")
          } else {
              alert("inside else statement")
                //AsyncStorage.setItem('user_id', '63826e91c853c9f1a4566f65')
                alert("inside else statement")
                console.log("inside else statement")
            alert('Itinerary activity saved successfully');
          }
        }
      )
    }
    return (
      <>
      <ScrollView>
        <StatusBar style="dark-content" />
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
              <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                <Image style={styles.backButton}
                  source={require('ItineraryApp/assets/icons/Refund_back.png')}
                 />   
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleModal()}>
                <Image style={styles.addButton}
                  source={require('ItineraryApp/assets/icons/Map_fill.png')}
                 /> 
              </TouchableOpacity>
                <Modal 
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}>
                    <View style={styles.modalContainer}>
                  <TouchableOpacity style={[styles.menuOptions]} onPress={() => navigation.navigate('ItineraryListScreen')}>
                    <Text style={[styles.text, {color:"#A067A5"}]}>Add to Itinerary</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.menuOptions]} onPress={() => navigation.navigate('ViewItinerary')}>
                    <Text style={[styles.text, {color:"#A067A5"}]}>Create new Itinerary</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.menuOptions]} onPress={() =>handleModal()}>
                    <Text style={[styles.text, {color:"red"}]}>Cancel</Text>
                  </TouchableOpacity>
                  </View>
                </Modal>
                {/* navigation.navigate("BookmarksScreen", {param : data}) */}
                {/* AsyncStorage.setItem('BookmarksScreen',JSON.stringify({param : data})) */}
              <TouchableOpacity onPress={() => sendBookmarkToDatabase()}>
                <Image style={styles.saveButton}
                  source={require('ItineraryApp/assets/icons/Bookmark_fill(1).png')}
                 /> 
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.name}>{data?.name}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 3, tintColor: '#E7BB20', width: 30, height: 30}}
                  source={require('ItineraryApp/assets/icons/star-regular-24(1).png')}
                />  
                <Text style={styles.rating}>{data?.rating}</Text>
                <Text style={styles.priceLevel}>{data?.price_level}</Text>
              </View>
              <Text style={styles.ranking}>{data?.ranking}</Text>

              {data?.cuisine && (
                <View style={styles.cuisine}>
                      {data?.cuisine.map((n) => (
                  <View style={styles.box}
                     key={n.key}
                  >
                  <Text style={{fontSize: 18}}>{n.name + ', '}</Text>
                </View>
                      ))}
              </View>
            )}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 3, tintColor: '#0C2D5C'}}
                  source={require('ItineraryApp/assets/icons/Pin_fill.png')}
                />  
                <Text style={{fontSize: 17, color: '#0C2D5C'}}>Location</Text>
              </View>
              <Text style={styles.location}>{data?.location_string}</Text>
            </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 5, tintColor: '#0C2D5C'}}
                  source={require('ItineraryApp/assets/icons/File_dock.png')}
                />  
                <Text style={{fontSize: 17, color: '#0C2D5C'}}>Description</Text>
              </View>
            <View>
              <Text style={styles.description} numberOfLines={10} renderTruncatedFooter>{data?.description}</Text>
              {/*<Text style={styles.description}>{data?.description}</Text> */}
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
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: 'ABeeZee-Regular',
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    //marginHorizontal: 5,
    marginTop: 5,
    marginHorizontal: 6,
  },
  // box: {
  //     width: 150,
  //     height: 50,
  //     borderRadius: 13,
  //     backgroundColor: '#FFFFFF',
  //     borderColor: '#744578',
  //     borderWidth: 3,
  //     opacity: 0.40,
  //     bottom: 55,
  //     flexDirection: 'row',
  // },

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
  }
  
});
export default MoreInformation;


