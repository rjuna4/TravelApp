import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView ,ScrollView ,StatusBar ,StyleSheet ,Text ,useColorScheme ,View ,} from 'react-native';
import { useLoadFonts, fonts } from './FontLoader';

const HeaderBanner = ({heading}) => {
    useLoadFonts();

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
        height: 70,
        width: 420,
        backgroundColor: '#57C2AF',
    },
    heading:{
        color: '#FFFFFF',
        fontSize: 30,
        marginLeft: 30,
        marginVertical: 15,
        fontFamily: fonts.outfitSemiBold,
    }
})


export default HeaderBanner;