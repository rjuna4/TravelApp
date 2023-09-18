import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList, ScrollView, FlatList} from 'react-native';
import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ItineraryContainer from 'ItineraryApp/components/ItineraryContainer';
import ActivityContainer from '../components/ActivityContainer';
import { getPlaceDetails } from '../api';
import HeaderBanner from '../components/HeaderBanner';
import SearchBar from '../components/SearchBar';

const Itineraries = ({route}) => {
    const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);


    const [date, setDate] = useState([   //pull from api
    {key: '1', name: 'Item 1'},
    {key: '2', name: 'Item 2'},
    {key: '3', name: 'Item 3'},
    {key: '4', name: 'Item 1'},
    {key: '5', name: 'Item 2'},
    {key: '6', name: 'Item 3'},
    {key: '7', name: 'Item 1'},
    {key: '8', name: 'Item 2'},
    {key: '9', name: 'Item 3'},
    {key: '10', name: 'Item 3'}

])

const [tabColor, changeColor] = useState("#00F3C8");
const [tab2Color, changeColor2] = useState("#FFFFFF");
const [activeTab, setActiveTab] = useState(1);

const changeTab = (tabNum) => {
  setActiveTab(tabNum);
  changeColor(tabNum === 1 ? '#00F3C8' : "#00F3C8");
  changeColor2(tabNum === 2 ? '#00F3C8' : "#FFFFFF");

}

    return (
      <View style={styles.container}>
        <View>
          <HeaderBanner heading = "Itineraries" style={styles.banner}>
          </HeaderBanner>
        </View>

        <View style={styles.tabs}>
          <View style={styles.tabContainer}>
                <Text
                  style={[
                    styles.tab1,
                    {
                      color: activeTab === 1 ? tabColor : '#FFFFFF',
                    },
                  ]}
                  onPress={() => changeTab(1)}
                >
                  Plan A Trip
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
                    }
                  ]}
                  onPress={() => changeTab(2)}
                >
                  My Trips
                </Text>
                {activeTab === 2 && (
                  <View style={styles.underline2} />
                )}
              </View>
            </View>

            <View>
            <SearchBar style ={styles.search}></SearchBar>
        </View>

          </View>
	    )  
  }

export default Itineraries

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232020",
  },
  banner: {
    justifyContent: "center",
  },
  tabs: {
    fontFamily: 'Outfit Medium',
    fontSize: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    top: 10,
    marginHorizontal: 55,
  },
  tab1: {
    fontFamily: 'Outfit Medium',
    fontSize: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    top: 10,
    marginHorizontal: 55,
  },
  activityImage: {
    width: '85%',
    height: 180,
    borderRadius: 13,
    marginHorizontal: 30,
    top: 20
  },
  name: {
    fontSize: 20,
    marginLeft: 25,
    top: '40%'
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  underline: {
    height: 3, // Adjust the thickness here
    backgroundColor: '#00F3C8', // Adjust the color here
    position: 'absolute',
    top: 42,
    left: 49,
    right: 0,
    width: 110
  },
  underline2: {
    height: 3, // Adjust the thickness here
    backgroundColor: '#00F3C8', // Adjust the color here
    position: 'absolute',
    top: 42,
    left: 41,
    right: 0,
    width: 105
  },
  search: {
    width: 350
  }
})