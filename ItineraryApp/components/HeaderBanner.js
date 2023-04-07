import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView ,ScrollView ,StatusBar ,StyleSheet ,Text ,useColorScheme ,View ,} from 'react-native';


const HeaderBanner = ({heading}) => {
    return (
        <View style={styles.banner}>
            <Text style={styles.heading}> 
                {heading}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    banner:{
        height: 80,
        width: 420,
        backgroundColor: '#57C2AF',
    },
    heading:{
        color: '#FFFFFF',
        fontSize: 30,
        marginLeft: 70,
        marginVertical: 18
    }
})


export default HeaderBanner;