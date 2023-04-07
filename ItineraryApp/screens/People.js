import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView ,ScrollView ,StatusBar ,StyleSheet ,Text ,useColorScheme ,View ,} from 'react-native';
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