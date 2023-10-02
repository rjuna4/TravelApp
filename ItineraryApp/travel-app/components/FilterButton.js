import {View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, TouchableHighlight } from "react-native";
import React, {useState} from 'react';
import { useNavigation } from "@react-navigation/native";
import MoreInformation from "../screens/moreInformation";
import { useLoadFonts, fonts } from '../components/FontLoader';

const FilterButton = ({text}) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        setIsSelected(true);
    }

    const handleUnselect = () => {
        setIsSelected(false);
    }

    useLoadFonts();
    return (
        <View>
            <TouchableHighlight 
                onPressIn={handleSelect}
                //onPressOut={handleUnselect}
                underlayColor="transparent"
                style={[
                    styles.button,
                    isSelected ? styles.buttonPressed : null, 
                ]}
            >
                <Text style={[
                        styles.buttonText,
                        isSelected ? styles.buttonPressedText : null, 
                    ]}
                >{text}
                </Text>
            </TouchableHighlight>
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
    buttonPressed: {
        backgroundColor: '#57C2AF',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: fonts.outfitRegular,
        color: '#6C696C',
        padding: 5,
        alignSelf: 'center',
    },
    buttonPressedText: {
        color: '#FFFFFF',
    }
})