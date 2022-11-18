import React, {useState, useLayoutEffect, useEffect} from "react";
import { StyleSheet, ScrollView, SafeAreaView, Text, TextInput, View, Keyboard, Button, Image, Dimensions } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { getPlaceDetails } from 'ItineraryApp/api/index.js'

const SearchBar = () => {
    const navigation = useNavigation();

    const[sw_lat, set_sw_lat] = useState(null)
    const[sw_lng, set_sw_lng] = useState(null)
    const[ne_lat, set_ne_lat] = useState(null)
    const[ne_lng, set_ne_lng] = useState(null)
    const[mainData, setMainData] = useState([])
    const[loading, setLoading] = useState(false)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);
    useEffect(() =>  {
      setLoading(true);
      getPlaceDetails(ne_lat, ne_lng, sw_lat, sw_lng).then(data => {
        setMainData(data);
        setInterval(() => {
          setLoading(false);
        }, 4000)
      }) 
    }, [ne_lat, ne_lng, sw_lat, sw_lng])

    return (   
        <View style={styles.list}>
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
                    set_ne_lat(details?.geometry?.viewport?.northeast?.lat)
                    set_ne_lng(details?.geometry?.viewport?.northeast?.lng)
                    set_sw_lat(details?.geometry?.viewport?.southwest?.lat)
                    set_sw_lng(details?.geometry?.viewport?.southwest?.lng)
                }}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('No search results found')}
                listEmptyComponent={() => (
                    <View style={{flex: 1}}>
                        <Text>No search results found</Text>
                    </View>
                )}    
            />
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
        fontSize: 19,
    },
    list: {
        height: '100%',
        position: 'absolute',
    }
});
