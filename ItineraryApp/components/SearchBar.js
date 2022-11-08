import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Image } from "react-native"

const SearchBar = ({clicked, searchItem, setSearchItem, setClicked}) => {
    return (
        <View style={StyleSheet.container}>
            <View
              style={
                clicked
                ? styles.searchBar__clicked
                : styles.searchBar__unclicked
              }
            >
            <Image style={styles.searchBarIcon}
                source={require('../assets/icons/Search_alt.png')}
            />    
            <TextInput
                style ={styles.container}
                placeholder="Where do you want to go?"
                value={searchItem}   
                onChangeText={setSearchItem} 
                onFocus={() => {
                    setClicked(true);
                }}
            />
        </View>  
        <View>
            <Image style={styles.crossButton}
                source={require('../assets/icons/Close_round.png')}
                title="Cancel"
                onPress={() => {
                    Keyboard.dismiss();
                    setClicked(false);
                }}
            />  
        </View>
    </View>
    );
};     
export default SearchBar;

const styles = StyleSheet.create({
    container: {
        width: 332,
        height: 56,
        color: "#F1EEEE",
        borderRadius: 13,
        flexDirection: "row",
        justifyContent: "center",
        fontSize: 19,
    },

    searchBar__clicked: {
        width: 332,
        height: 56,
        color: "#F1EEEE",
        borderRadius: 13,
        shadowColor: "#0E74AD",
        shadowOffset: { width: 4, height: 10}
    },

    searchBar__unclicked: {
        width: 332,
        height: 56,
        color: "#1D54A6",
        borderRadius: 13,
        shadowColor: "#0E74AD",
        shadowOffset: { width: 4, height: 10}
    },

    searchBarIcon: {
        width: 21,
        height: 19.25,
        justifyContent: 'flex-start',
    }
});
