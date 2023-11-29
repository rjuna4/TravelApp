import {Component, useLayoutEffect, useState, useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, Pressable, Image, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Modal, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DialogInput from 'react-native-dialog-input'
import Dialog from 'react-native-dialog'
//import AsyncStorage from '@react-native-community/async-storage'
import { getPlaceDetails } from 'ItineraryApp/api/index.js';

function ActivityRecommendations() {



  const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
      }, []);


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
  
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => {
      setIsModalVisible(() => !isModalVisible)
    };

  
    const data = route?.params?.param



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
            source={{ uri: data?.photo?.images?.large?.url }}
          />
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <View style={[styles.box1, {marginHorizontal: 18, marginBottom: 150}]}></View>
                <Image style={styles.backButton}
                  source={require('ItineraryApp/assets/icons/Refund_back.png')}
                 />   
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleModal()}>
              <View style={[styles.box1, {marginHorizontal: 18, marginBottom: -50}]}></View>
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
                  <TouchableOpacity style={[styles.menuOptions]} onPress={() => navigation.navigate('Iineraries')}>
                    <Text style={[styles.text, {color:"#A067A5"}]}>Create new Itinerary</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.menuOptions]} onPress={() =>handleModal()}>
                    <Text style={[styles.text, {color:"red"}]}>Cancel</Text>
                  </TouchableOpacity>
                  </View>
                </Modal>
              <TouchableOpacity onPress={() => sendBookmarkToDatabase()}>
              <View style={[styles.box1, {marginHorizontal: 345, marginBottom: -45}]}></View>
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
                  <View
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
    fontFamily: fonts.outfitMedium,
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
  }

  
});
export default ActivityRecommendations;


