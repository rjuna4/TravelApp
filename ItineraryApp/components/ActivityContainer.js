import {View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import MoreInformation from "../screens/moreInformation";

const ActivityContainer = ({image, name, location, data}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate("MoreInformation", {param : data})}>
            <Image style = {styles.activityImage}
                source={{uri: image}}
            />
            {name ? (
            <>
            <Text style={styles.nameText}> 
                { name?.length > 13 ? `${name.slice(0, 13)}...` : name }
            </Text>
            <View>
                <Text style={styles.locationText}>
                    { location?.length > 15 ? `${location.slice(0,15)}...` : location }
                </Text>
                <Image source={require('ItineraryApp/assets/icons/Pin_fill.png')} style={{width: 23, height: 23, marginTop: -23, marginHorizontal: 10}}></Image>
            </View>
        </>
        ) : (
        <></>
        )} 
            
        </TouchableOpacity>
    )
}


export default ActivityContainer


const styles = StyleSheet.create({
    activityImage: {
        width: 150,
        height: 140,
        borderRadius: 4,
        marginHorizontal: 15,
        marginTop: 20,
    },

    nameText: {
        fontSize: 19,
        marginHorizontal: 15,
    },

    locationText: {
        fontSize: 16,
        marginHorizontal: 32,
    }

});

