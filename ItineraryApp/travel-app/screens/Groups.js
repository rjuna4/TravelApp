import React, { Component, useState, useLayoutEffect} from 'react';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, FlatList, useColorScheme, View, TouchableOpacity, Image} from 'react-native';
import HeaderBanner from '../components/HeaderBanner';
import CreateGroup from './createGroup';
import { fonts } from '../components/FontLoader';

const Groups = () => {
    const navigation = useNavigation();
    const route = useRoute();
    //const { selectedImage, activityTitle } = route.params || {}
    const { updatedGroupData } = route.params || {};
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
              <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
                <Image style={styles.addButton}
                  source={require('travel-app/assets/icons/add.png')}
                 />   
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                data={updatedGroupData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item}) => (
                  <View>
                    {item.selectedImage && (
                      <Image style={styles.selectedImage}
                             source={{uri: item.selectedImage}}
                      />      
                    )}
                    {item.activityTitle && (
                      <Text style={styles.activityTitle}>
                        {item.activityTitle}
                        </Text>
                    )}
                    </View>
                )}
               />
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {/* <View>
              {selectedImage && (
                <Image
                  style={styles.selectedImage}
                  source={{ uri: selectedImage }}
                />
              )}
            </View> */}
            {/* <View style={{display: 'flex', flexDirection: 'column'}}>
                {activityTitle && (
                  <Text style={styles.activityTitle}>
                    {activityTitle}
                  </Text>
                )}
                <TouchableOpacity onPress={() => navigation.navigate('CreateGroup')}>
                  <Text style={{color: '#FFFFFF', fontFamily: fonts.outfitRegular, fontSize: 18}}>Edit</Text>
                </TouchableOpacity>
            </View> */}
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
      fontSize: 18,
      fontFamily: fonts.outfitMedium,
      marginTop: 10,
      marginLeft: 10,
    }
})

export default Groups;