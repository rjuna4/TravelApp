import { ImageBackground, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [selectedHeaderPicture, setSelectedHeaderPicture] = useState(null);

  const pickProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setSelectedProfilePicture(result.uri);
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
        setSelectedHeaderPicture(result.uri);
    }
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickHeaderPicture} style={styles.headerPictureContainer}>
        {selectedHeaderPicture ? (
            <ImageBackground
            style={styles.selectedHeaderPicture}
            source={{ uri: selectedHeaderPicture }} />
        ) : (
          <Image style={styles.cameraIcon}
            source={require('travel-app/assets/icons/camera.png')} />
        )}
        
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={pickProfilePicture} style={styles.profilePictureContainer}>
            {selectedProfilePicture ? (
                <Image style={styles.selectedProfilePicture} source={{uri: selectedProfilePicture }} />
            ) : (
                <Image style={styles.cameraIcon}
                source={require('travel-app/assets/icons/camera.png')}
            />   
            )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')}>
          <Image
            style={styles.settingsIcon}
            source={{
              uri: 'https://i.stack.imgur.com/oLA6F.png',
            }}
          />
        </TouchableOpacity>
      </View>
     
  
      <Image
        style={styles.profilePicture}
        source={{
          uri: 'https://creativeandcultural.files.wordpress.com/2018/04/default-profile-picture.png',
        }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>Test User</Text>
          <Text style={styles.userName}>test_user</Text>
          <Text>Age: </Text>
          <TextInput
                    placeholderTextColor='#FFFFFF'
                    //style={styles.heading}
                    //value={activityTitle}
                    //onChangeText={(text => setActivityTitle(text))}
                    //onChangeText={(text) => setFormData( {...formData, fullName: text})}
              />
          <Text>Gender: </Text>
          <TextInput
                    placeholderTextColor='#FFFFFF'
                    //style={styles.heading}
                    //value={activityTitle}
                    //onChangeText={(text => setActivityTitle(text))}
                    //onChangeText={(text) => setFormData( {...formData, fullName: text})}
              />
          <View>
            <Text style={styles.myLikes}>Travel Bucket List</Text>
          </View>
          <View>
            <Text style={styles.myLikes}>Favorite Travel Location</Text>
            <TextInput
                    placeholder="Favorite Travel Location"
                    placeholderTextColor='#FFFFFF'
                    //style={styles.heading}
                    //value={activityTitle}
                    //onChangeText={(text => setActivityTitle(text))}
                    //onChangeText={(text) => setFormData( {...formData, fullName: text})}
              />
          </View>
          <View>
            <Text>My Bookmarks</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.listView}>
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
        </View>
        <View style={styles.bottomSpace}></View>
      </ScrollView>
    </View>
  );
};
export default ProfileScreen;

// Grab the initials of the users name and display them in the Avatar
// let name = 'User Name to be configured'; // Pull users name and run regex
// let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

// let initials = [...name.matchAll(rgx)] || [];

// initials = (
//   (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
// ).toUpperCase();

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
    width: 130,
    height: 130,
    borderRadius: '65%',
    zIndex: 3,
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
});
