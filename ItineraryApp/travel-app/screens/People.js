import React, { Component, useState, useLayoutEffect, useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity} from 'react-native';
import HeaderBanner from '../components/HeaderBanner';
//import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';


const People = ({route}) => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);

      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])


    const requestForegroundLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Foreground permission status:', status)
    
      if (status === 'granted') {
        // Location permission granted
        return true;
      } else {
        // Location permission denied
        return false;
      }
    };

    const requestBackgroundLocationPermission = async () => {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      console.log('Background permission status:', status)
    
      if (status === 'granted') {
        // Background location permission granted
        return true;
      } else {
        // Background location permission denied
        return false;
      }
    };
    
    const startLocationUpdates = async () => {
      const foregroundPermissionGranted = await requestForegroundLocationPermission();
      
      //const backgroundPermissionGranted = await requestBackgroundLocationPermission();
      if (foregroundPermissionGranted) {
        Location.watchPositionAsync(
          { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 1000000, distanceInterval: 10 },
          (location) => {
            // console.log("Location update: ", location);
            setLocation(location);
          }
        )
      }
    }

    useEffect(() => {
      startLocationUpdates();
    }, []);

    return (
        <View style={styles.container}>
          <View>
            <HeaderBanner heading = "People" style={styles.banner}>
            </HeaderBanner>
          </View>
          <View>
            <TouchableOpacity style={{width: 100, height: 100, backgroundColor: '#FFFFFF', borderRadius: 50, 
            display: "flex", justifyContent: 'center', alignItems: 'center'}} onPress={() => navigation.navigate("ProfileScreen")}>
                <Text style={{color: "#000000", fontSize: 18}}>Profile Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 100, height: 100, backgroundColor: '#FFFFFF', borderRadius: 50, 
            display: "flex", justifyContent: 'center', alignItems: 'center'}} onPress={() => requestForegroundLocationPermission()}>
                <Text style={{color: "#000000", fontSize: 18}}>Track User Location</Text>
            </TouchableOpacity>
            {location && (
            <MapView
              style={{width: '90%', height: '50%', left: '5%', top: '5%', borderRadius: 4 }}
              initialRegion={{
                latitude: 42.000450228105095,
                longitude: -87.65966035594717,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
            <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="User's Approximate Location"
              />
          </MapView>
          )}
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
})

export default People;