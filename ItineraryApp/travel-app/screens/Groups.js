import React, { Component, useState, useEffect, useLayoutEffect} from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, FlatList, useColorScheme, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import HeaderBanner from '../components/HeaderBanner';
import CreateGroup from './createGroup';
import ConfirmationModal from '../components/ConfirmationModal';
import { fonts } from '../components/FontLoader';
const User = require('../models/userModel')
//const mongoose = require('mongoose')
//const ObjectId = mongoose.Types.ObjectId
import AsyncStorage from '@react-native-async-storage/async-storage';
import  { jwtDecode } from 'jwt-decode';
import { MongoExpiredSessionError } from 'mongodb';
import { decode } from 'base-64';


const Groups = ({ route }) => {
    const navigation = useNavigation();
    const { groupData, selectedDate, selectedStartTime } = route.params || {groupData: [], selectedDate: null, selectedStartTime: null };
    //console.log("groupData on groups screen: ", groupData);
    const [updatedGroupData, setUpdatedGroupData] = useState(groupData);
    const [userGroups, setUserGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // useEffect(() => {
    //   const userId = '6386857fce851928b24c6b4f';
    //   fetchUserGroupsCreated(userId)
    //   .then((data) => {
    //     setUserGroups(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // }, []);



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
              const groups = await fetchUserGroupsCreated(userId);
              setUserGroups(groups);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);


    //console.log('groupData in Groups component: ', groupData);
    //console.log(groupData);
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

   

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

    async function fetchUserGroupsCreated(userId) {
      try {
        const jwt = await getJWT();
        console.log("token in fetchUserGroups", jwt);
        if (!jwt) {
          return null;
        }
        const response = await fetch(`http://172.20.10.7:8082/api/createdGroups/${userId}`, {
          method: 'GET',
          headers: {
            // 'Authorization': `Bearer ${jwt}`,
            'Authorization': jwt,
          }
        });

        if (response.status === 200) {
          console.log("response in fetchUserGroups: ", response);
          const data = await response.json();
          console.log("data in fetchUserGroups: ", data);
          return data;
        } else {
          console.error("Error response: ", response);
          throw new Error("Error fetching data");
        }
      } catch (error) {
        console.error("Netwok request error: ", error);
        throw error;
      }
    }
    console.log('userGroups:', userGroups);

    async function handleDeleteGroup(groupId) {
      console.log("groupId in deletegroup: ", groupId);
      try {
        const response = await fetch(`http://172.20.10.7:8082/api/createdGroups/${groupId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          const updatedUserGroups = userGroups.filter((group) => group._id !== groupId);
          setUserGroups(updatedUserGroups);
          setShowModal(false);
        } else {
          console.error("Error deleting group clientside");
        }
       } catch (error) {
          console.error("Netwok request error: ", error);
        }
      };


      const handleCancel = () => {
        setShowModal(false);
      }

      const saveTokenToStorage = async (token) => {
        try {
          await AsyncStorage.setItem('token', token);
        } catch (error) {
          console.error('Error saving token to storage: ', error);
        }
      }

    return (
        <View style={styles.container}>
          <View>
            <HeaderBanner heading = "Groups" style={styles.banner}>
            </HeaderBanner>
            <View>
              {/* <TouchableOpacity onPress={() => navigation.navigate('CreateGroup', {
                                                groupData: groupData, 
                                                groupId: item._id,
                                                fetchGroupData: fetchUserGroupsCreated})}> */}
              <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
                <Image style={styles.addButton}
                  source={require('travel-app/assets/icons/add.png')}
                 />   
              </TouchableOpacity>
            </View>
            <View>
            <FlatList
                  data={userGroups}
                  keyExtractor={(item) => item._id} // Replace with the actual unique key
                  renderItem={({ item }) => (
                    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20}}>
                       <Image
                        source={{ uri: item.groupImageFilename }} // Provide the image URL
                        style={styles.selectedImage} // Adjust the dimensions as needed
                      />
                      
                      <View style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={styles.activityTitle}>{item.groupTitle}</Text>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Image style={styles.dateIcon}
                            source={require('travel-app/assets/icons/date.png')}
                            />   
                             <Text style={{color: '#D9D9D9', fontSize: 16, fontFamily: fonts.outfitRegular, marginTop: 15, marginLeft: 5}}>{item.groupActivityDate}</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Image style={styles.timeIcon}
                            source={require('travel-app/assets/icons/time.png')}
                            />   
                            <Text style={{color: '#D9D9D9', fontSize: 16, fontFamily: fonts.outfitRegular, marginTop: 15, marginLeft: 5}}>{item.groupActivityTime}</Text>
                          </View>
                      </View>
                     {/* <TouchableOpacity onPress={() => handleDeleteGroup(item._id)}> */}
                     <TouchableOpacity onPress={() => navigation.navigate('CreateGroup', {
                                      groupData: groupData,
                                      groupId: item._id,
                                      fetchGroupData: fetchUserGroupsCreated,
                                      userId: userId,
                     })}>
                       <Image style={styles.editIcon}
                          source={require('travel-app/assets/icons/Edit_fill.png')}
                        />  
                     </TouchableOpacity>
                     <View style={{display: 'flex', flexDirection: 'column', bottom: 120}}>
         
                     <TouchableOpacity onPress={() => setShowModal(true)}>
                       <Image style={styles.trashIcon}
                          source={require('travel-app/assets/icons/Trash_duotone_line.png')}
                        />  
                     </TouchableOpacity>
                     </View>
                     <View>
                        <ConfirmationModal
                            visible={showModal}
                            message="Are you sure you want to delete this group?"
                            onConfirm={() => handleDeleteGroup(item._id)}
                            onCancel={handleCancel}
                        />
                     </View>
                    </View>
                  )}
              />
              <FlatList
                style={{height: 550}}
                data={groupData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20}}>
                      {item.selectedImage && (
                        <Image style={styles.selectedImage}
                              source={{uri: item.selectedImage}}
                        />      
                      )}
                        <View style={{display: 'flex', flexDirection: 'column'}}>
                          {item.activityTitle && (
                            <Text style={styles.activityTitle}>{item.activityTitle}</Text>
                          )}
                          <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Image style={styles.dateIcon}
                            source={require('travel-app/assets/icons/date.png')}
                            />   
                            {item.selectedDate && (
                              <Text style={{color: '#D9D9D9', fontSize: 16, fontFamily: fonts.outfitRegular, marginTop: 15, marginLeft: 5}}>{item.selectedDate}</Text>
                            )}
                          </View>
                          <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Image style={styles.timeIcon}
                            source={require('travel-app/assets/icons/time.png')}
                            />   
                            {item.selectedStartTime && (
                              <Text style={{color: '#D9D9D9', fontSize: 16, fontFamily: fonts.outfitRegular, marginTop: 15, marginLeft: 5}}>{item.selectedStartTime}</Text>
                            )}
                          </View>
                        </View>
                        <View style={styles.line} />
                      </View>
                )}
               />
             
            </View>
          </View>
      </View>  
    )  
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#232020",
    },
    banner: {
        justifyContent: "center",
    },
    addButton: {
        width: 35,
        height: 35,
        marginTop: 50,
    },
    selectedImage: {
      width: 209,
      height: 144,
      borderRadius: 4,
      marginLeft: 10,
      marginTop: 10,
    },
    activityTitle: {
      color: '#00F3C8',
      fontSize: 20,
      fontFamily: fonts.outfitMedium,
      marginTop: 10,
      marginLeft: 10,
    },
    dateIcon: {
      width: 20,
      height: 20,
      marginTop: 15,
      marginLeft: 8,
    },
    timeIcon: {
      width: 20,
      height: 20,
      marginTop: 15,
      marginLeft: 8,
    },
    trashIcon: {
      width: 30,
      height: 30,
      marginTop: 130,
    },
    editIcon: {
      width: 25,
      height: 25,
      marginTop: 130,
    },
    line: {
      borderBottomColor: '#818181',
      width: 334,
      borderBottomWidth: 1,
      marginTop: 130,
      marginRight: 100,
    }
})

export default Groups;