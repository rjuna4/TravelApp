import React, { Component, useState, useLayoutEffect} from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, FlatList, useColorScheme, View, TouchableOpacity, Image} from 'react-native';
import HeaderBanner from '../components/HeaderBanner';
import CreateGroup from './createGroup';
import { fonts } from '../components/FontLoader';

const Groups = ({ route }) => {
    const navigation = useNavigation();
    const { groupData, selectedDate, selectedStartTime } = route.params || {groupData: [] };
    console.log(groupData);
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])


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
    line: {
      borderBottomColor: '#818181',
      width: 334,
      borderBottomWidth: 1,
      marginTop: 130,
      marginRight: 100,
    }
})

export default Groups;