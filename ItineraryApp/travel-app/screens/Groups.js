import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Image} from 'react-native';
import HeaderBanner from '../components/HeaderBanner';
import CreateGroup from './createGroup';

const Groups = ({route}) => {
    const navigation = useNavigation();
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
    }
})

export default Groups;