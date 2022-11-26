import {Component, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, StatusBar, Pressable, Image, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Modal, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapTest from './mapsTest';
import DialogInput from 'react-native-dialog-input'
import Dialog from 'react-native-dialog'
import AsyncStorage from '@react-native-async-storage/async-storage';

function map() { new Map();}

const textInput = () => {

  const[userInput, setUserInput] = useState('');
  const[dialogVisible, setDialogVisible] = useState(false);

  
  { userInput ?
      <Text style={styles.text}>{userInput}</Text>
      :
      <Text style={styles.text}>App</Text>
  }
  <DialogInput
    isDialogVisible={visible}
    title={"Create new itinerary"}
    hintInput={"Enter a name for itinerary"}
    submitInput={ (input) => {
      setUserInput(input),
      setDialogVisible(false)
    }}    
    closeDialog={() => setDialogVisible(false)}>
  </DialogInput>    

}   


function MoreInformation({route}) {

  let userid = AsyncStorage.getItem('user_id')
  alert("userid ", userid)

  const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
      }, []);
  

    const data = route?.params?.param
    //console.log("data: ", data)
    //map();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => {
      setIsModalVisible(() => !isModalVisible)
    };

    postData = async () => {
      try {
          let post = {title: data?.name, image: data?.photo?.images?.large?.url, location: data?.location_string}
          const posts = await AsyncStorage.getItem('posts') || '[]';
          posts = JSON.parse(posts);
          posts.push(post);
          AsyncStorage.setItem('posts', JSON.stringify(posts)).then(() => {
          });
      } catch(error) {
        alert('Failed to save the data to the storage')
      }
      };

    
    const bookmarks = [{id: 0, image:data , name: data?.name}]
    let bookmarkData = data
    const [bookmark, setBookmark] = useState(false)
    // storage = AsyncStorage()

    const storeData = async () => {
      try {
        await AsyncStorage.setItem('token', 'book')
      } catch (e) {

      }
    }

    const saveBookmarkedActivity = async data => {
      // const [bookmark, setBookmark] = useState(false)
      // storage = AsyncStorage()
      setBookmark(true)
      try {
      await AsyncStorage.getItem('image').then(token => {
        alert('Your bookmark post');
        const res = JSON.parse(token);
        alert('Your bookmark post');
           if (res !== null) {
               let data = res.find(value => value === data);
               if (data == null) {
                   res.push(data);
                   AsyncStorage.setItem('bookmark', JSON.stringify(res));
                   alert('Your bookmark post');
               }
           } else {
               let bookmark = [];
               bookmark.push(data);
               AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
               alert('Your bookmark post');
           }
      }) 
    } catch (e) {
        alert('Failed to save the data to the storage')
      }
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
                  <TouchableOpacity style={[styles.menuOptions]} onPress={() => navigation.navigate('CreateItinerary', {param : data})}>
                    <Text style={[styles.text, {color:"#A067A5"}]}>Create new Itinerary</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.menuOptions]} onPress={() =>handleModal()}>
                    <Text style={[styles.text, {color:"red"}]}>Cancel</Text>
                  </TouchableOpacity>
                  </View>
                </Modal>
                {/* navigation.navigate("BookmarksScreen", {param : data}) */}
                {/* AsyncStorage.setItem('BookmarksScreen',JSON.stringify({param : data})) */}
              <TouchableOpacity onPress={() => saveBookmarkedActivity()}>
                <Image style={styles.saveButton}
                  source={require('ItineraryApp/assets/icons/Bookmark_fill(1).png')}
                 /> 
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.name}>{data?.name}</Text>
              <Text style={styles.priceLevel}>{data?.price_level}</Text>
              <Text style={styles.ranking}>{data?.ranking}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 3}}
                  source={require('ItineraryApp/assets/icons/Pin_fill.png')}
                />  
                <Text style={{fontSize: 17}}>Location</Text>
              </View>
              <Text style={styles.location}>{data?.location_string}</Text>
            </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 5}}
                  source={require('ItineraryApp/assets/icons/File_dock.png')}
                />  
                <Text style={{fontSize: 17}}>Description</Text>
              </View>
            <View>
              <Text style={styles.description} numberOfLines={10} renderTruncatedFooter>{data?.description}</Text>
              {/*<Text style={styles.description}>{data?.description}</Text> */}
            </View>
            <View>
              <Text style={styles.price}>{data?.price}</Text>
              <Text style={styles.rating}>{data?.rating}</Text>
              {/*<Text style={styles.hours}>{data?.hours}</Text> */}
            </View>
            <View>
              {/*<Text style={styles.priceLevel}>{data?.cuisine}</Text> */}
            </View>
        </View>
      </ScrollView>  
      </>
    );
  }

  // const bookmarks = [{
  //   id: 0,
  //   image: {uri: data?.photo?.images?.large?.url },
  //   name: data?.name
  // }]

  // const bookmarkData = data?.photo?.images?.large?.url 

  //  const saveBookmarkedActivity = async bookmarkData => {
  //   const [bookmark, setBookmark] = useState(false)
  //   storage = AsyncStorage()
  //   setBookmark(true)
  //   await storage.getItem('bookmark').then(token => {
  //     const response = JSON.parse(token);
  //     if (response !== null) {
  //       response.push(data)
  //       storage.setItem('bookmark', JSON.stringify(response))
  //     }
  //     else {
  //       let bookmark = []
  //       bookmark.push(data)
  //       storage.setItem('bookmark', JSON.stringify(bookmark))
  //     }
  //   })
  // }




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
    fontSize: 25,
    marginTop: 7,
    marginHorizontal: 10,
  },
  location: {
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 2,
  },
  ranking: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  priceLevel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -30,
    marginLeft: 320,
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
  }
  
});
export default MoreInformation;


