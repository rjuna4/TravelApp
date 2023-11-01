import React, { Component, useState, useEffect, useLayoutEffect} from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, FlatList, useColorScheme, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import HeaderBanner from '../components/HeaderBanner';
import CreateGroup from './createGroup';
import { fonts } from '../components/FontLoader';
const User = require('../models/userModel')

const Groups = ({ route }) => {
    const navigation = useNavigation();
    const { groupData, selectedDate, selectedStartTime } = route.params || {groupData: [], selectedDate: null, selectedStartTime: null };
    //console.log("groupData on groups screen: ", groupData);
    const [updatedGroupData, setUpdatedGroupData] = useState(groupData);
    const [userGroups, setUserGroups] = useState([]);

    // useEffect(() => {
    //   // This effect will be triggered whenever groupData changes.
    //   setUpdatedGroupData(groupData);
    // }, [groupData]);

    // useEffect(() => {
    //   const userId = '6386857fce851928b24c6b4f';
    //   fetchUserGroupsCreated(userId)
    //   //   .then((data) => {
    //   //     setUserGroups(data);
    //   //   })
    //   //   .catch((error) => {
    //   //     console.error(error);
    //   //   })
    //   // setUpdatedGroupData(groupData);
    // }, [groupData]);

    useEffect(() => {
      const userId = '6386857fce851928b24c6b4f';
      fetchUserGroupsCreated(userId)
      .then((data) => {
        setUserGroups(data);
      })
      .catch((error) => {
        console.error(error);
      });
    }, []);


    //console.log('groupData in Groups component: ', groupData);
    //console.log(groupData);
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    async function getUserIdByEmail(username) {
      try {
        const user = await User.findOne({ username });
        if (user) {
          const userId = user._id;
          return userId;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async function fetchUserGroupsCreated(userId) {
      try {
        const response = await fetch(`http://172.20.10.7:8082/api/createdGroups/${userId}`);
        if (response.status === 200) {
          const data = await response.json();
          console.log("data: ", data);
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

    const groupId = '6542d013a9d7b257d699e51b';
    async function handleDeleteGroup(groupId) {
      try {
        const response = await fetch('http://172.20.10.7:8082/api/createdGroups/6542d013a9d7b257d699e51b', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          const updatedUserGroups = userGroups.filter((group) => group._id !== groupId);
          setUserGroups(updatedUserGroups);
        } else {
          console.error("Error deleting group");
        }
       } catch (error) {
          console.error("Netwok request error: ", error);
        }
      };

    return (
        <View style={styles.container}>
          <View>
            <HeaderBanner heading = "Groups" style={styles.banner}>
            </HeaderBanner>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('CreateGroup', {groupData: groupData})}>
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
                    <View style={{marginBottom: 40}}>
                      <Text style={{color: '#FFFFFF'}}>{item.groupActivityDate}</Text>
                      <Text style={{color: '#FFFFFF'}}>{item.groupActivityTime}</Text>
                      <Text style={styles.activityTitle}>{item.groupTitle}</Text>
                      <Image
                        source={{ uri: item.groupImageFilename }} // Provide the image URL
                        style={styles.selectedImage} // Adjust the dimensions as needed
                      />
                     <TouchableOpacity onPress={handleDeleteGroup}>
                       <Image style={styles.trashIcon}
                          source={require('travel-app/assets/icons/Trash_duotone_line.png')}
                        />  
                     </TouchableOpacity>
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