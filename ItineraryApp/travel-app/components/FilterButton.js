import {View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import MoreInformation from "../screens/moreInformation";
import { useLoadFonts, fonts } from '../components/FontLoader';

const FilterButton = ({text}) => {
    useLoadFonts();
    return (
        <View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FilterButton


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F1EEEE',
        borderRadius: 22,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        height: 37,
        width: 170,
        margin: 8,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: fonts.outfitRegular,
        color: '#6C696C',
        padding: 5,
        alignSelf: 'center',
    }
})