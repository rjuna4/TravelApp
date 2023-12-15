import { ImageBackground, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useLoadFonts, fonts } from '../components/FontLoader';
import { response } from 'express';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import Realm from "realm";
import * as FileSystem from 'expo-file-system';
import RealmManager from '../schemas/RealmManager';

const ProfileSchema = {
  name: 'Profile',
  properties: {
    userId: 'string',
    selectedProfilePicture: 'string',
    selectedHeaderPicture: 'string',
    gender: 'string',
    age: 'string',
    travelBucketList: 'string',
    favoriteTravelPhotos: 'string',
  },
};


// if (realm) {
//   realm.close();
// }

// const realmConfig = {
//   schema: [ProfileSchema],
//   path: `${FileSystem.documentDirectory}/my-local-realm-file.realm`,
// };

// const realm = new Realm(realmConfig);

//const realm = RealmManager.openRealm(ProfileSchema);
// Perform Realm operations

// Close Realm when done
//RealmManager.closeRealm();

const EditProfile = () => {
  const navigation = useNavigation();
  const [addIconPosition, setAddIconPosition] = useState(0);
  const [addIconPosition1, setAddIconPosition1] = useState(0);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [selectedHeaderPicture, setSelectedHeaderPicture] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [travelBucketList, setTravelBucketList] = useState([]);
  const [favoriteTravelPhotos, setFavoriteTravelPhotos] = useState([]);
  const [travelInterests, setTravelInterests] = useState('');
  const [userUserId, setUserId] = useState(null);
  useLoadFonts();

  const pickProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.canceled) {
        const selectedAsset = result.assets[0];
        if (selectedAsset && selectedAsset.uri) {
            setSelectedProfilePicture(selectedAsset.uri);
        }
    }
  }

  const pickHeaderPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        const selectedAsset = result.assets[0];
        if (selectedAsset && selectedAsset.uri) {
            setSelectedHeaderPicture(selectedAsset.uri);
        }
    }
  }

  const pickTravelPhotos = async (list = 'travelBucketList') => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        if (list === 'favoriteTravelPhotos') {
            setFavoriteTravelPhotos([...favoriteTravelPhotos, result.uri]);
            console.log('favoriteTravelPhotos: ', favoriteTravelPhotos);
        } else if (list === 'travelBucketList') {
            console.log('Selected Image URI:', result.uri);
            setTravelBucketList([...travelBucketList, result.uri]);
            console.log('travelBucketList:', travelBucketList);
        }
    }
}

  const getJWT = async () => {
    try {
      const jwt = await AsyncStorage.getItem('token');
      console.log("jwt in getJWT: ", jwt)
      return jwt;
    } catch (error) {
      console.error("Error retrieving JWT: ", error);
      return null;
    } 
  }

//   useEffect(() => {
    
//     console.log('travelBucketList:', travelBucketList);
//   }, [travelBucketList]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = await getJWT();
        if (jwt) {
          const tokenParts = jwt.split('.');
          console.log("tokenParts: ", tokenParts);
          if (tokenParts.length === 3) {
            const payload = decode(tokenParts[1]);
            const decodedToken = JSON.parse(payload);
            console.log('decodedToken: ', decodedToken);
            const currentUserId = decodedToken.id;
            console.log('currentUserId: ', currentUserId);
            setUserId(currentUserId);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
    fetchData();
  }, []);


  const renderImages = (imageList, list) => {
      return imageList.map((imageUri, index) => (
        <View key={index}>
            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 4, zIndex: 5, marginLeft: 15, marginTop: 10}} />
            <TouchableOpacity onPress={() => removeImage(index, list)}>
                <Text>Remove</Text>
            </TouchableOpacity>
        </View>
      ))
  }

  const removeImage = (index) => {
      if (list === 'favoriteTravelPhotos') {
        const updatedImages = [...favoriteTravelPhotos];
        updatedImages.splice(index, 1);
        setFavoriteTravelPhotos(updatedImages);
      } else if (list === 'travelBucketList') {
        const updatedImages = [...travelBucketList];
        updatedImages.splice(index, 1);
        setTravelBucketList(updatedImages);
      }
  }

  async function saveProfileInfoToDatabase () {
    if (age && gender && selectedProfilePicture) {
        const profileData = {
            selectedProfilePicture,
            selectedHeaderPicture,
            age: Number(age),
            gender,
            travelBucketList,
            favoriteTravelPhotos,
        }

        try {
          realm.write(() => {
            realm.create('Profile', { ...profileData, userId: userUserId });
          });
          console.log('Profile saved locally');
        } catch (localSaveError) {
          console.error("Error saving profile locally:", localSaveError);
          alert('An error occurred while saving the profile locally.');
          return;
        }

        try {
            const jwt = await getJWT();
            console.log("jwt in save group: ", jwt);
            //console.log("userId in saveGroup: ", userId);
            if (!jwt) {
              console.error("JWT is missing");
              alert("JWT is missing");
              return;
            }
            console.log('Request Payload:', {
              userId: userUserId,
              profileData,
            });

            const response = await fetch('http://172.20.10.7:8082/api/userProfiles', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt,
              },
              body: JSON.stringify({
                userId: userUserId,
                profileData,
              }),
            });

            console.log('userId in save profile: ', userUserId);
            console.log('response status: ', response.status);

            const responseData = await response.json(); // Read the response body once

            if (response.status === 200) {
              console.log('Profile saved successfully');
              alert('Profile saved successfully');
              navigation.navigate('ProfileScreen', { profileData });
            } else {
              console.error('Error response: ', responseData);
              alert(`Error: ${responseData.error || 'Unknown error'}`);
            }
          } catch (networkError) {
            console.error('Network request error: ', networkError);
            alert('An error occurred while saving the profile');
          }
          
    } else {
        console.log("Please fill in all the required fields");
        alert('Please fill in all the required fields');
    }
  }

  return (
    <View style={styles.container}>
    <ScrollView>
      <TouchableOpacity onPress={pickHeaderPicture} style={styles.headerPictureContainer}>
        {selectedHeaderPicture ? (
            <ImageBackground
            style={styles.selectedHeaderPicture}
            source={{ uri: selectedHeaderPicture }} />
        ) : (
            <View>
                <ImageBackground
                style={styles.selectedHeaderPicture}
                source={{ uri: 'travel-app/assets/appimages/IMG_4731.JPG' }}/>
                <Image style={{width: 45, height: 45, zIndex: 4, tintColor: '#D9D9D9', bottom: 140, left: 175}}
                source={require('travel-app/assets/icons/camera.png')} />
            </View>
        )}     
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={pickProfilePicture}>
            {selectedProfilePicture ? (
                <View>
                    <Image style={styles.cameraIcon1} source={require('travel-app/assets/icons/camera.png')} />   
                    <Image style={styles.selectedProfilePicture} source={{uri: selectedProfilePicture }} />      
                </View>
            ) : (
                <View style={styles.profilePictureContainer}>
                    <Image style={styles.cameraIcon}
                    source={require('travel-app/assets/icons/camera.png')}/>   
                </View>
            )}
        </TouchableOpacity>
      </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.myLikes}>Age: </Text>
          <TextInput
                    placeholderTextColor='#FFFFFF'
                    placeholder="Enter Age"
                    style={styles.textInput}
                    value={age}
                    onChangeText={(text => setAge(text))}
                    
              />
          <Text style={styles.myLikes}>Gender: </Text>
          <TextInput
                    placeholderTextColor='#FFFFFF'
                    placeholder="Enter Gender"
                    style={styles.textInput}
                    value={gender}
                    onChangeText={(text => setGender(text))}
              />
         </View>
          <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            <View>
                <Text style={styles.myLikes}>Travel Bucket List</Text>
                <ScrollView horizontal style={{height: 120, width: 400}}>
                <TouchableOpacity style={{position: 'absolute', left: addIconPosition, top: 40}}
                                        onPress={() => {
                                            pickTravelPhotos('travelBucketList');
                                            setAddIconPosition(addIconPosition + 120);
                                        }}>
                    <Image source={require('travel-app/assets/icons/add.png')} style={styles.addIcon}/>
                </TouchableOpacity>
                    <View style={{display: 'flex', flexDirection: 'row', alignContent: 'space-evenly'}}>
                        {renderImages(travelBucketList, 'travelBucketList')}
                    </View>
                </ScrollView>
            </View>
            <View>
            <Text style={styles.myLikes}>Favorite Travel Photos</Text>
                <ScrollView horizontal style={{height: 120}}>
                <TouchableOpacity style={{position: 'absolute', left: addIconPosition, top: 40}}
                                        onPress={() => {
                                            pickTravelPhotos('favoriteTravelPhotos');
                                            setAddIconPosition(addIconPosition + 120);
                                        }}>
                    <Image source={require('travel-app/assets/icons/add.png')} style={styles.addIcon}/>
                </TouchableOpacity>
                    <View style={{display: 'flex', flexDirection: 'row', alignContent: 'space-evenly'}}>
                        {renderImages(favoriteTravelPhotos, 'favoriteTravelPhotos')}
                    </View>
                </ScrollView>
            </View>
            <View>
                <Text style={styles.myLikes}>Travel Interests</Text>
            </View>
            <TouchableOpacity onPress={saveProfileInfoToDatabase} style={styles.saveButton}>
                 <Text style={{color: '#FFFFFF', fontSize: 18}}>Save</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{color: '#FFFFFF'}}>My Bookmarks</Text>
          </View>

      </ScrollView>
    </View>
  );
};
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232020",
  },
  header: {
    width: 775,
    height: 273,
  },
  selectedHeaderPicture: {
    height: 250,
    position: 'relative'
  },

  selectedProfilePicture: {
    width: 112,
    height: 112,
    borderRadius: 56,
    zIndex: 3,
    position: 'absolute',
    bottom: -10,
    right: 125,
    borderColor: '#00F3C8',
    borderWidth: 2,
  },
  textInput: {
    color: '#FFFFFF',
    fontFamily: fonts.outfitRegular,
    top: 10,
    marginRight: 160,
  },
  profilePictureContainer: {
    width: 112,
    height: 112,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    borderColor: '#00F3C8',
    borderWidth: 2,
    left: 135,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    position: 'absolute'
  },
  imageContainer: {
    width: 328,
    height: 186,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginLeft: 22,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    width: 45,
    height: 45,
    zIndex: 2,
    tintColor: '#D9D9D9',
  },
  cameraIcon1: {
    width: 45,
    height: 45,
    zIndex: 4,
    tintColor: '#FFFFFF',
    left: 173,
    bottom: 25,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginBottom: 20,
  },
  myLikesPicsLeft: {
    borderRadius: 25,
    height: 155,
    width: 155,
    marginLeft: 20,
    marginVertical: 10,
  },
  myLikesPicRight: {
    borderRadius: 25,
    height: 155,
    width: 155,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  info: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  settingsIcon: {
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: 20,
    height: 25,
    width: 25,
    opacity: 0.7,
  },
  text: {
    fontSize: 30,
  },
  // Users name below the profile picture
  name: {
    fontSize: 20,
    color: '#858383',
    opacity: 0.95,
    fontWeight: 'bold',
    marginTop: -15,
  },
  userName: {
    marginTop: 5,
    fontSize: 16,
    opacity: 0.75,
    color: '#858383',
  },
  myLikes: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: fonts.outfitRegular,
  },
  bottomSpace: {
    marginBottom: 40,
  },
  addIcon: {
      width: 30,
      height: 30,
  },
  saveButton: {
      width: 100,
      height: 35,
      borderRadius: 25,
      backgroundColor: '#57C2AF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      left: 100,
      //top: 100,
      //left: 40,
      bottom: 300,
  }
});
