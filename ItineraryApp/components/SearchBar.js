import React from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, View, Keyboard, Button, Image } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const SearchBar = () => {
    return (
        <SafeAreaView style={styles.container}>
            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: 'geometry'}}
                style={styles.container}
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
        //alignItems: 'center',
        height: 35,
        width: 390,
        color: "purple",
        borderRadius: 13,
        fontSize: 19,
        marginHorizontal : 12,
        //justifyContent: 'center',
        top: 152
    }
});
