import React, { Component, useState, useLayoutEffect, useEffect} from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View, TouchableOpacity, Image} from 'react-native';
import HeaderBanner from '../components/HeaderBanner';
import Groups from './Groups';
import { fonts } from '../components/FontLoader';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from '@react-native-community/datetimepicker';
import redMarker from 'travel-app/assets/icons/redMarker.png'
import greenMarker from 'travel-app/assets/icons/greenMarker.png'
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import Realm from "realm";
import {createRealmContext} from '@realm/react'
import * as FileSystem from 'expo-file-system';
//import createRealmContext from '../models/createRealmContext.js';
import RealmManager from '../schemas/RealmManager';

import { MongoClient } from 'mongodb-realm/browser';


const GroupCreatedSchema = {
  name: 'GroupCreated',
  properties: {
    userId: 'string',
    groupImageFilename: 'string',
    groupTitle: 'string',
    groupActivityDate: 'string',
    groupActivityTime: 'string',
  },
};


const realm = RealmManager.openRealm(GroupCreatedSchema);
RealmManager.closeRealm();

const CreateGroup = ({route}) => {
    
    const navigation = useNavigation();
    const {groupData: existingGroupData, groupId, fetchGroupData, userId } = route.params || 
                                                                    { groupData: [], 
                                                                      groupId: null,
                                                                      fetchGroupData: null,
                                                                      userId: null }
    const [groupData, setGroupData] = useState(existingGroupData);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activityTitle, setActivityTitle] = useState('');
 
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const initialDate = new Date();
    initialDate.setHours(0, 0, 0, 0);
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [selectedStartTime, setSelectedStartTime] = useState(initialDate);
    const [userUserId, setUserId] = useState(null);



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

              if (groupId) {
                console.log("groupId: ", groupId);
                if (fetchGroupData) {
                  fetchGroupData(userId) 
                    .then((data) => {
                      setGroupData(data);
                      console.log("data on create groups screen: ", data)
                      setSelectedImage(data.groupImageFilename);
                      setActivityTitle(data.groupTitle);
                    })
                    .catch((error) => {
                      console.error(error);

                    });
                }
              } else {
              }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
      fetchData();
    }, [groupId, fetchGroupData]);


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

    const handleDateChange = (event, selected) => {
      if (selected) {
        setSelectedDate(selected);
        console.log(selected);
      }
    }

    const handleTimeChange = (event, selected) => {
      if (selected) {
        const newDate = new Date(selected);
        setSelectedStartTime(newDate);
        console.log(selected);
      }
    }

    const toggleDatePicker = () => {
      setDatePickerVisible(!isDatePickerVisible);
    }

    const toggleTimePicker = () => {
      setTimePickerVisible(!isTimePickerVisible);
    }
  

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.uri);
        }
    }

    async function saveCreatedGroupToDatabase() {
      console.log('saveCreatedGroupToDatabase function called');
      if (selectedImage && activityTitle && selectedDate && selectedStartTime) {
        console.log("userUserId:", userUserId);
        if (!userUserId) {
          console.error("User ID is missing");
          console.log("User id is missing");
          alert("User ID is missing");
          return;
        }
        const formattedDate = format(selectedDate, 'MM-dd-yyyy');
        console.log("formattedDate: ", formattedDate);
        const formattedTime = format(selectedStartTime, 'HH:mm');
        console.log("formattedTime: ", formattedTime);
        const newGroup = {
          groupImageFilename: selectedImage,
          groupTitle: activityTitle,
          groupActivityDate: formattedDate,
          groupActivityTime: formattedTime,
        };
        console.log("newGroup: ", newGroup);
    
        // Try saving data locally
        try {
          realm.write(() => {
            realm.create('GroupCreated', { ...newGroup, userId: userUserId });
          });
          console.log("Group saved locally");
        } catch (localSaveError) {
            console.error("Error saving group locally:", localSaveError);
            alert('An error occurred while saving the group locally.');
            return;
        }
    
        // Try saving data to the database
        try {
          const jwt = await getJWT();
          console.log("jwt in save group: ", jwt);
          if (!jwt) {
            console.error("JWT is missing");
            alert("JWT is missing");
            return;
          }
    
          console.log("Request Payload:", {
            userId: userUserId,
            ...newGroup,
          });
    
          const response = await fetch('http://172.20.10.7:8082/api/createdGroups', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': jwt,
            },
            body: JSON.stringify({
              userId: userUserId,
              ...newGroup,
            }),
          });
    
          console.log("userId in save group: ", userUserId);
          console.log('response status: ', response.status);
    
          if (response.status === 200) {
            console.log("Group saved successfully");
            // alert('Group saved successfully');
            const updatedGroupData = [...groupData, newGroup];
            setSelectedImage(null);
            setActivityTitle('');
            setGroupData(updatedGroupData);
            try {
              navigation.push('Groups', {
                groupData: updatedGroupData,
                selectedDate: selectedDate,
                selectedStartTime: selectedStartTime,
              });
            } catch (error) {
              console.error('Error navigating to Groups:', error);
            }
          } else {
            const data = await response.json();
            console.error("Error response: ", data);
            alert(`Error: ${data.error}`);
          }
        } catch (networkError) {
          console.error("Network request error: ", networkError);
          alert('An error occurred while saving the group to the database.');
        }
      } else {
        console.log("Please fill in all the required fields");
        alert('Please fill in all the required fields.');
      }
    }

    async function updateGroupsCreatedData(groupId, updatedData) {
      try {
        const response = await fetch(`http://172.20.10.7:8082/api/createdGroups/${groupId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        });
        if (response.status === 200) {
          const updatedGroup = await response.json();
          return updatedGroup;
        } else {
            const errorData = await response.json();
            throw new Error(`Error updating group: ${errorData.message}`)
        }
      } catch (error) {
        console.error("Network request error: ", error);
        throw error;
      }
    }

    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const [tabColor, changeColor] = useState("#00F3C8");
    const [tab2Color, changeColor2] = useState("#FFFFFF");
    const [activeTab, setActiveTab] = useState(1);

    const changeTab = (tabNum) => {
        setActiveTab(tabNum);
        changeColor(tabNum === 1 ? '#00F3C8' : "#00F3C8");
        changeColor2(tabNum === 2 ? '#00F3C8' : "#FFFFFF");
    }

    return (
      // <RealmContext.Provider value={realm}>
        <View style={styles.container}>
          <ScrollView>
          <View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Groups')}>
                <Image style={styles.backButton}
                  source={require('travel-app/assets/icons/Refund_back.png')}
                 />   
              </TouchableOpacity>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <TextInput
                    placeholder="Add Title"
                    placeholderTextColor='#FFFFFF'
                    style={styles.heading}
                    value={activityTitle}
                    onChangeText={(text => setActivityTitle(text))}
                    //onChangeText={(text) => setFormData( {...formData, fullName: text})}
              />
              </View>
              <View>
                  <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        {selectedImage ? (
                            <Image style={styles.selectedImage} source={{uri: selectedImage }} />
                        ) : (
                            <Image style={styles.cameraIcon}
                            source={require('travel-app/assets/icons/camera.png')}
                        />   
                        )}
                    </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.tabs}>
                <View style={styles.tabContainer}>
                  <Text
                    style={[
                      styles.tabs,
                      {
                        color: activeTab === 1 ? tabColor : '#FFFFFF',
                      },
                    ]}
                    onPress={() => changeTab(1)}
                  >
                    Public
                  </Text>
                  {activeTab === 1 && (
                    <View style={styles.underline} />
                  )}
                </View>
              <View style={styles.tabContainer}>
                <Text
                  style={[
                    styles.tabs,
                    {
                      color: activeTab === 2 ? tab2Color : '#FFFFFF',
                      textDecoration: 'underline',
                    }
                  ]}
                  onPress={() => changeTab(2)}
                >
                  Private
                </Text>
                {activeTab === 2 && (
                  <View style={styles.underline2} />
                )}
              </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => toggleDatePicker()}>
                  <Image style={styles.dateIcon}
                    source={require('travel-app/assets/icons/date.png')}
                  />   
                  <Text style={{color: '#FFFFFF', fontFamily: fonts.outfitRegular, marginLeft: 50}}> Add Date</Text>
              </TouchableOpacity>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => toggleTimePicker()}>
                  <Image style={styles.timeIcon}
                    source={require('travel-app/assets/icons/time.png')}
                  />   
                  <Text style={{color: '#FFFFFF', fontFamily: fonts.outfitRegular}}> Add Time</Text>
              </TouchableOpacity>
            </View>
            {isDatePickerVisible && (
                <DatePicker
                    style={{width: 200, zIndex: 5}}
                    value={selectedDate}
                    //date={selectedDate}
                    mode="date"
                    placeholder="Select date"
                    format="YYYY-MM-DD"
                    minDate="2020-01-01"
                    maxDate="2030-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateInput: {
                            borderWidth: 0,
                        },
                    }}
                    onDateChange={handleDateChange}
                    />
            )}
            {isTimePickerVisible && (
                <DatePicker
                    style={{width: 200, zIndex: 5}}
                    value={selectedDate}
                    //date={selectedDate}
                    mode="time"
                    placeholder="Select time"
                    format="YYYY-MM-DD"
                    minDate="2020-01-01"
                    maxDate="2030-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateInput: {
                            borderWidth: 0,
                        },
                    }}
                    onDateChange={handleTimeChange}
                    />
            )}
            <Text style={{color: '#FFFFFF', fontFamily: fonts.outfitRegular, fontSize: 18}}>Set Capacity:</Text>
            <TextInput
                    placeholder="__"
                    placeholderTextColor='#FFFFFF'
                    style={{color: '#FFFFFF', fontFamily: fonts.outfitRegular, fontSize: 14}}
                    //onChangeText={(text) => setFormData( {...formData, fullName: text})}
              />
            <Text style={{color: '#FFFFFF', fontFamily: fonts.outfitRegular, fontSize: 18}}>Description</Text>
            <View style={styles.descriptionContainer}>
              <TextInput
                placeholder="Enter a description here..."
                placeholderTextColor='#D9D9D9'
                style={styles.input}
              />
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {/* <Image>{greenMarker}</Image> */}
              <Text style={{color: '#FFFFFF', fontFamily: fonts.outfitRegular, fontSize: 20, marginLeft: 10}}>Activity Location</Text>
              <Text style={{color: '#FFFFFF', fontFamily: fonts.outfitRegular, fontSize: 20, marginLeft: 30}}>Custom Marker</Text>
            </View>
            {/* <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Groups', {groupData: updatedGroupData})}> */}
            <TouchableOpacity style={styles.saveButton} onPress={() => saveCreatedGroupToDatabase(userId)}>
              <Text style={{color: '#FFFFFF', fontFamily: fonts.outfitMedium, fontSize: 18}}>Save</Text>
            </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
      </View>  
     /* </RealmContext.Provider> */
    )  
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#232020",
    },
    descriptionContainer: {
      width: 327,
      height: 87,
      borderRadius: 13,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#D9D9D9',
      marginHorizontal: 10,
      marginTop: 5,
      marginBottom: 5,
      color: '#FFFFFF',
      // bottom: -50
    },
    input: {
      color: '#FFFFFF',
      marginBottom: 50,
      marginLeft: 10,
    },
    heading: {
        fontFamily: fonts.outfitMedium,
        fontSize: 30,
        color: '#FFFFFf',
    },
    backButton: {
        width: 30,
        height: 30,
        marginTop: 50,
        marginLeft: 15,
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
    selectedImage: {
        width: 328,
        height: 186,
        borderRadius: 4,
    },
    cameraIcon: {
        width: 70,
        height: 60,
        zIndex: 2,
    },
    tabs: {
        fontFamily: fonts.outfitMedium,
        fontSize: 18,
        color: "#FFFFFF",
        justifyContent: 'center',
        flexDirection: 'row',
        top: 10,
        marginHorizontal: 55,
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    underline: {
        height: 2, // Adjust the thickness here
        backgroundColor: '#00F3C8', // Adjust the color here
        position: 'absolute',
        top: 37,
        left: 49,
        right: 0,
        width: 63
      },
      underline2: {
        height: 2, // Adjust the thickness here
        backgroundColor: '#00F3C8', // Adjust the color here
        position: 'absolute',
        top: 37,
        left: 49,
        right: 0,
        width: 70
      },
      dateIcon: {
          width: 20,
          height: 20,
          marginTop: 40,
          marginLeft: 20,
      },
      timeIcon: {
        width: 20,
        height: 20,
        //marginTop: 40,
        marginLeft: 140,
    },
      saveButton: {
        backgroundColor: '#57C2AF',
        width: 114,
        height: 37,
        borderRadius: 22,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 130,
        marginBottom: 200,
      }

})

export default CreateGroup;