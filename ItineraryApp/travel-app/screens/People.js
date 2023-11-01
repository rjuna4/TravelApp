import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity} from 'react-native';
import HeaderBanner from '../components/HeaderBanner';

const People = ({route}) => {
    const navigation = useNavigation();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

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