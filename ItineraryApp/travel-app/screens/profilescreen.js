import { ImageBackground, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useLoadFonts, fonts } from '../components/FontLoader';
import RealmManager from '../schemas/RealmManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  { jwtDecode } from 'jwt-decode';
import { MongoExpiredSessionError } from 'mongodb';
import { decode } from 'base-64';


const ProfileScreen = ({route}) => {
  const navigation = useNavigation();
  //const { profileData } = route.params || {profileData: {} }
  const [profileData, setProfileData] = useState({});
  const [name, setName] = useState('');
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [selectedHeaderPicture, setSelectedHeaderPicture] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [travelBucketList, setTravelBucketList] = useState([]);
  const [favoriteTravelPhotos, setFavoriteTravelPhotos] = useState([]);
  useLoadFonts(); 

  // useEffect(() => {
  //   const realm = RealmManager.openRealm(ProfileSchema);
  //   try { 
  //     const profile = realm.objects('Profile')[0];
  //     if (profile) {
  //     setSelectedProfilePicture(profile.selectedProfilePicture || null);
  //     setSelectedHeaderPicture(profile.selectedHeaderPicture || null);
  //     setAge(profile.age || '');
  //     setGender(profile.gender || '');
  //     setTravelBucketList(profile.travelBucketList || []);
  //     setFavoriteTravelPhotos(profile.favoriteTravelPhotos || [])
  //   }
  // } catch (error) {
  //   console.error('Error fetching profile data: ', error);
  // } finally {
  //   RealmManager.closeRealm(realm);
  // }
  //  fetchProfileData();
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = await getJWT();
        console.log("jwt in useEffect: ", jwt)
        if (jwt) {
          const tokenParts = jwt.split('.');
          console.log("tokenParts: ", tokenParts);
          if (tokenParts.length === 3) {
            const payload = decode(tokenParts[1]);
            const decodedToken = JSON.parse(payload);
            console.log('decodedToken: ', decodedToken);
            const userId = decodedToken.id;
            console.log('userId: ', userId);
            const profile = await fetchProfileData(userId);
            setProfileData(profile);
            console.log('profileData: ', profile);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

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

  async function fetchProfileData(userId) {
    try {
      const jwt = await getJWT();
      console.log("token in fetchProfileData", jwt);
      if (!jwt) {
        return null;
      }
      const response = await fetch(`http://172.20.10.7:8082/api/userProfiles/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': jwt,
        }
      });

      if (response.status === 200) {
        console.log("response in fetchProfileData: ", response);
        const data = await response.json();
        console.log("data in fetchProfileData ", data);
        return data;
      } else {
        console.error("Error response: ", response);
        throw new Error("Error fetching data");
      }
    } catch (error) {
      console.error("Network request error: ", error);
      throw error;
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.headerPictureContainer}>
        {profileData.selectedHeaderPicture ? (
            <ImageBackground
            style={styles.selectedHeaderPicture}
            source={{ uri: profileData.selectedHeaderPicture }} />
        ) : (
            <View>
                <ImageBackground
                style={styles.selectedHeaderPicture}
                source={{ uri: 'travel-app/assets/appimages/IMG_4731.JPG' }}/>
            </View>
        )}     
      <View>
            {profileData.selectedProfilePicture ? (
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
      </View>
     
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Image style={styles.editIcon}
          source={require('travel-app/assets/icons/Edit_fill.png')} />
      </TouchableOpacity>
      {/* <View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
          <Image
            style={styles.settingsIcon}
            source={{
              uri: 'https://i.stack.imgur.com/oLA6F.png',
            }}
          />
        </TouchableOpacity>
      </View>
       */}
      {profileData.selectedProfilePicture ? (
          <Image
            style={styles.selectedProfilePicture}
            source={{
              uri: profileData.selectedProfilePicture
            }}
          />
        ) : (
          <Image
            style={styles.selectedProfilePicture}
            source={{
              uri: 'https://creativeandcultural.files.wordpress.com/2018/04/default-profile-picture.png',
            }}
          />
      )}
      {profileData.selectedProfilePicture && console.log('Profile Picture URI:', profileData.selectedProfilePicture)}
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>Test User</Text>
          <Text style={styles.userName}>test_user</Text>
          <Text>Age: {profileData.age || ''} </Text>
          <Text>Gender: {profileData.gender || ''} </Text>
          <View>
            <Text style={styles.myLikes}>Travel Bucket List</Text>
            {profileData.travelBucketList && (
            <ScrollView horizontal style={{ height: 120, width: 400 }}>
              {profileData.travelBucketList.map((imageUri, index) => (
                <Image key={index} source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 4, zIndex: 5, marginLeft: 15, marginTop: 10 }} />
              ))}
            </ScrollView>
          )}
          </View>
          <View>
            <Text style={styles.myLikes}>Favorite Travel Photos</Text>
            {profileData.favoriteTravelPhotos && (
            <ScrollView horizontal style={{ height: 120, width: 400 }}>
              {profileData.favoriteTravelPhotos.map((imageUri, index) => (
                <Image key={index} source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 4, zIndex: 5, marginLeft: 15, marginTop: 10 }} />
              ))}
            </ScrollView>
          )}
          </View>
          <View>
            <Text>My Bookmarks</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        {/* <View style={styles.listView}>
          <Image
            style={styles.myLikesPicsLeft}
            source={{
              uri: 'https://www.nationsonline.org/gallery/Qatar/Dark-Clouds-over-West-Bay-Skyline-Doha.jpg',
            }}
          />
          <Image
            style={styles.myLikesPicRight}
            source={{
              uri: 'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTYyNDg1MjE3MTI1Mjc5Mzk4/topic-london-gettyimages-760251843-promo.jpg',
            }}
          />
          <Image
            style={styles.myLikesPicsLeft}
            source={{
              uri: 'https://podroztrwa.pl/wp-content/uploads/2021/09/river-6175173_1920-min.jpg',
            }}
          />
          <Image
            style={styles.myLikesPicRight}
            source={{
              uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/9b/2f/5b/cairo.jpg?w=700&h=500&s=1',
            }}
          />
          <Image
            style={styles.myLikesPicsLeft}
            source={{
              uri: 'https://a.cdn-hotels.com/gdcs/production92/d1580/9a28fc70-9bea-11e8-a1b5-0242ac110053.jpg',
            }}
          />
          <Image
            style={styles.myLikesPicRight}
            source={{
              uri: 'https://portal.ehawaii.gov/assets/webp/page/government/counties/honolulu.webp',
            }}
          />
        </View> */}
        <View style={styles.bottomSpace}></View>
      </ScrollView>
    </View>
    </View>
  );
};
export default ProfileScreen;

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
  },
  body: {
    marginTop: 20,
  },
  bodyContent: {
    fontSize: 10,
    alignItems: 'center',
    padding: 30,
  },
  selectedProfilePicture: {
    width: 112,
    height: 112,
    borderRadius: 56,
    zIndex: 3,
    position: 'absolute',
    bottom: 100,
    right: 125,
    borderColor: '#00F3C8',
    borderWidth: 2,
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
  // profilePicture: {
  //   width: 130,
  //   height: 130,
  //   borderWidth: 2,
  //   borderRadius: 65,
  //   borderColor: '#A067A5',
  //   marginBottom: 10,
  //   alignSelf: 'center',
  //   position: 'absolute',
  //   marginTop: 130,
  // },
  cameraIcon: {
    width: 70,
    height: 60,
    zIndex: 2,
    tintColor: '#FFFFFF',
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
    color: '#696969',
    marginTop: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  bottomSpace: {
    marginBottom: 40,
  },
  // editIcon: {
  //   width: 35,
  //   height: 35,
  //   top: 100,
  //   left: 50,
  // }
});
