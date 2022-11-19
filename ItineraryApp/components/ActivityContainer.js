import {View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import MoreInformation from "../screens/moreInformation";

const ActivityContainer = ({image, name, location, data}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate("MoreInformation", {param : data})}>
            <ImageBackground style = {styles.activityImage}
                source={{uri: image}}
            />
            {name ? (
            <>
            <Text style={styles.nameText}> 
                { name?.length > 15 ? `${name.slice(0, 15)}...` : name }
            </Text>
            <View>
                <Text style={styles.locationText}>
                    { location?.length > 18 ? `${location.slice(0,18)}...` : location }
                </Text>
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
        height: 150,
        borderRadius: 13,
    },

    nameText: {
        fontSize: 18,
    },

    locationText: {
        fontSize: 15,
    }

});

