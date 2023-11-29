import {View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import MoreInformation from "../screens/moreInformation";

const ItineraryActivity = ({image, title}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate("MoreInformation")} styles={styles.itineraryContainer}>
            {/*
            <ImageBackground style = {styles.activityImage}
                source={{uri: imageSrc}}
            {title ? (
            <>
            <Text style={styles.titleText}> 
                { title?.length > 15 ? `${title.slice(0, 15)}...` : title }
            </Text> */}
        </TouchableOpacity>
    )
}

export default ItineraryActivity


const styles = StyleSheet.create({
    itineraryContainer: {
        width: 314,
        height: 181,
        backgroundColor: '#744578"'
    }


});
