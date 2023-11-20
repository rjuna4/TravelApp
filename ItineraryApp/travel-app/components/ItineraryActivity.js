import {View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import MoreInformation from "../screens/moreInformation";
import { useLoadFonts, fonts } from '../components/FontLoader';
import ActivityRecommendations from "../screens/activityRecommendations";
import HeaderBanner from "./HeaderBanner";

const ItineraryActivity = ({image, name, location, data, route}) => {
    const navigation = useNavigation();
    useLoadFonts();
    return (
        <View styles={styles.container}>
            <View style = {{display: "flex", flexDirection: "column", margin: 30}}>
                <View style = {{display: "flex", flexDirection: "row"}}>
                    <Image style={styles.activityImage}
                         source={require('travel-app/assets/icons/time.png')}
                    />
                    <Text style={styles.description}> 
                    This is the description of the activity.
                    </Text>
                </View>
                <View style = {{display: "flex", flexDirection: "row"}}>
                    <Text style = {{color: '#D9D9D9', fontFamily: fonts.outfitMedium, fontSize: 18}}> 
                    This is the title of the activity.
                    </Text>
                    </View>
                
                <View style = {{display: "flex", flexDirection: "row"}}>
                    <Image style={{marginHorizontal: 5, tintColor: '#FFFFFF', width: 27, height: 27,}}
                    source={require('travel-app/assets/icons/Pin_fill.png')}/> 
                    <Text style = {{color: '#D9D9D9', fontFamily: fonts.outfitMedium, fontSize: 18}}> 
                    This is the location of the activity.
                    </Text>
                    </View>
                    <View style = {{display: "flex", flexDirection: "row"}}>
                        <View style = {{display: "flex", flexDirection: "row"}}>
                            <Image style={{marginHorizontal: 5, tintColor: '#FFFFFF', width: 27, height: 27,}}
                            source={require('travel-app/assets/icons/time.png')}
                            resizeMode='contain'/> 
                            <Text style = {{color: '#D9D9D9', fontFamily: fonts.outfitMedium, fontSize: 16}}>
                                Timing
                            </Text>
                        </View>
                        <View style = {{display: "flex", flexDirection: "row"}}>
                            <Image style={{marginHorizontal: 5, tintColor: '#FFFFFF', width: 27, height: 27,}}
                            source={require('travel-app/assets/icons/date.png')}
                            resizeMode='contain'/> 
                            <Text  style = {{color: '#D9D9D9', fontFamily: fonts.outfitMedium, fontSize: 16}}>
                                Dates
                            </Text>
                        </View>
                    </View>
                <View>
                    <Text style = {{color: '#D9D9D9', fontFamily: fonts.outfitMedium, fontSize: 20}}>
                    Add Notes
                    </Text>
                </View>
                <View style={styles.line} />
            </View>
        </View>

    )
}

export default ItineraryActivity

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#232020",
        position: 'relative',
      },
    description: {
        fontSize: 16,
        color: '#D9D9D9',
        margin: 20,
        marginRight: 170
      },
    activityImage: {
        width: 150,
        height: 150,
        borderRadius: 4,
        backgroundColor: '#D9D9D9',
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        display: "flex",
      },
      notes: {
        fontSize: 18,
        color: '#D9D9D9',
        margin: 20
      },
      line: {
        borderBottomColor: '#818181',
        width: 334,
        borderBottomWidth: 1,
        marginTop: 20
      }

})