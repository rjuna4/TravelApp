import React from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, View, Keyboard, Button, Image } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const SearchBar = () => {
    return (
        <SafeAreaView style={StyleSheet.container}>
            <Image style={styles.searchBarIcon}
                source={require('../assets/icons/Search_alt.png')}
            />    
            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: 'geometry'}}
                style ={styles.container}
                placeholder="Where do you want to go?"
                query={{
                    key: 'AIzaSyAkWZoqmot4KRuIsGlZshMlJ1PV52fOYhk',
                    language: 'en'
                }}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    console.log("data: ", data)
                    console.log("details: ", details)
                    console.log(JSON.stringify(details?.geometry?.viewport));
                }}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('No search results found')}
                listEmptyComponent={() => (
                    <View style={{flex: 1}}>
                        <Text>No search results found</Text>
                    </View>
                )}    
            />
    </SafeAreaView>
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
        fontSize: 19,
    },
    
    searchBarIcon: {
        justifyContent: 'flex-start',
        width: 332,
        height: 56,
    }
});
