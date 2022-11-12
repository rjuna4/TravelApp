import {Icon, SafeAreaView, TextInput, ImageBackground, Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { Component, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

const googleAPIkey = 'AIzaSyAkWZoqmot4KRuIsGlZshMlJ1PV52fOYhk';

const ActivityRecommendations = () => {

        const navigation = useNavigation();

        useLayoutEffect(() => {
            navigation.setOptions({
                headerShown: false,
            })
        }, []);

        return (
            <SafeAreaView>
                <View>
                    <TouchableOpacity>
                        <Image style ={styles.foodIcon}
                            source={require('ItineraryApp/assets/icons/bx-bowl-hot 1.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style ={styles.touristAttractionIcon}
                            source={require('ItineraryApp/assets/icons/bx-bowl-hot 1.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style ={styles.hotelsIcon}
                            source={require('ItineraryApp/assets/icons/bx-bowl-hot 1.png')}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
         
        )
    }    

   

export default ActivityRecommendations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  activityImage: {
    flex: 1,
    justifyContent: "center",
    height: 610,
    width: 420,
  },
  activityTitle: {
    textAlign: "center",
    color: "#DA5263"
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: "#DA5263",
    width: 205,
    height: 56,
    marginBottom: 100,
    marginHorizontal: 100
  },
  foodIcon: {
    width: 45,
    height: 45,
  }
})