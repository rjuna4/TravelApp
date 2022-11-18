import {Icon, SafeAreaView, TextInput, ImageBackground, Image, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import React, { Component, useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import ActivityContainer from '../components/ActivityContainer';
import { getPlaceDetails } from 'ItineraryApp/api/index.js';
import SearchBar from '../components/SearchBar';
import ActivityMenu from '../components/ActivityMenu';

//const googleAPIkey = 'AIzaSyAkWZoqmot4KRuIsGlZshMlJ1PV52fOYhk';

const ActivityRecommendations = () => {

        const navigation = useNavigation();
        const[loading, setLoading] = useState(false)
        const[mainData, setMainData] = useState([])
        const[searchItem, setSearchItem] = useState("");
        const[activityType, changeActivityType] = useState("restaurants")
        const[clicked, setClicked] = useState(false);
        return (
            <SafeAreaView>
                <View>
                <SearchBar style={styles.searchBar}
                  searchItem={searchItem}
                  setSearchItem={setSearchItem}
                  clicked={clicked}
                  setClicked={clicked}
                />
                </View>
                {loading ? 
                <View>
                   <ActivityIndicator visible ={loading} size="large" color="#08646B" />
                </View> : 
                <ScrollView>
                  <View>
                  <ActivityMenu
                    key={"restaurants"}
                    name="Restaurants"
                    image={require('ItineraryApp/assets/icons/restaurant(2).png')}
                    activityType={activityType}
                    changeActivityType={changeActivityType}
                  />
                  <ActivityMenu
                    key={"attractions"}
                    name="Attractions"
                    image={require('ItineraryApp/assets/icons/beach.png')}
                    activityType={activityType}
                    changeActivityType={changeActivityType}
                  />
                  <ActivityMenu
                    key={"hotels"}
                    name="Hotels"
                    image={require('ItineraryApp/assets/icons/hotel(2).png')}
                    activityType={activityType}
                    changeActivityType={changeActivityType} 
                  /> 
                  </View>
                  <View>
                    <View>
                      <Text style={styles.recommendations}>Recommendations</Text>
                    </View>
                    <View>
                      {mainData?.length > 0 ? (
                      <>
                        {mainData?.map((data, i) => (
                          <ActivityContainer
                            key={i}
                            image={
                              data?.photo?.images?.medium?.url 
                              ? data?.photo?.images?.medium?.url 
                              : 'ItineraryApp/assets/icons/restaurant(1).png'
                            }
                            title={data?.name}
                            location={data?.location_string}
                            data={data}
                         />   
                        ))}
                      </> 
                      ) : ( 
                      <>
                        <View>
                          <Text>No results found</Text>
                        </View>
                      </>
                      )}
                    </View>
                  </View>
                </ScrollView> }
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
  icon: {
    width: 65,
    height: 65,
    marginTop: 90,
    marginLeft: 55,

  },
  recommendations: {
    fontSize: 25,
    marginTop: 35,
    marginLeft: 10,
    color: "#744578",
  },
  text1: {
    textAlign: 'left',
    fontSize: 18,
  },
  text2: {
    textAlign: 'center',
    fontSize: 18,
  },
  text3: {
    textAlign: 'right',
    fontSize: 18,
  },
})