import {Component, useLayoutEffect, useState, useEffect} from 'react';
import {Text, View, Modal, StyleSheet, StatusBar, Pressable, Image, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Button, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DialogInput from 'react-native-dialog-input'
import Dialog from 'react-native-dialog'
import HeaderBanner from '../components/HeaderBanner';
import { getPlaceDetails } from 'travel-app/api/index.js';
import Itineraries from './Itineraries';
import SearchBar from '../components/SearchBar';
import ActivityContainer from '../components/ActivityContainer';
import { useLoadFonts, fonts } from '../components/FontLoader';
import FilterButton from '../components/FilterButton';
import ActivityRecommendations from './activityRecommendations';

const FiltersScreen = ({ visible, onClose }) => {
    useLoadFonts(); 
    const navigation = useNavigation();
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.container}> 
                <ScrollView>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 70}}>
                        <TouchableOpacity onPress={() => navigation.navigate("ActivityRecommendations")}>
                            <Image style={styles.closeIcon}
                                source={require('travel-app/assets/icons/Close.png')} 
                            />
                        </TouchableOpacity>  
                        <Text style={styles.screenHeading}>Filters</Text>
                    </View>
                    <View style={styles.screenContent}>
                        <Text style={styles.categories}>Categories</Text>
                            <View style={styles.filters}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <FilterButton
                                        text="Amusement Parks" 
                                    />
                                    <FilterButton
                                        text="Restaurants" 
                                    />
                                </View>    
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <FilterButton
                                        text="Religious Sites" 
                                    />
                                    <FilterButton
                                        text="Festivals & Events" 
                                    />
                                </View>    
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <FilterButton
                                        text="Cultural & Heritage Tours" 
                                    />
                                    <FilterButton
                                        text="Hotels" 
                                    />
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <FilterButton
                                        text="Hiking Spots" 
                                    />
                                    <FilterButton
                                        text="Sightseeing Tours" 
                                    />
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <FilterButton
                                        text="Historical Monuments" 
                                    />
                                    <FilterButton
                                        text="Water Sports" 
                                    />
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row'}}> 
                                    <FilterButton
                                        text="National Parks" 
                                    />
                                    <FilterButton
                                        text="Gardens & Parks" 
                                    />
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <FilterButton
                                        text="Architecture" 
                                    />
                                    <FilterButton
                                        text="Beaches" 
                                    />
                                    <FilterButton
                                        text="Museums" 
                                    />
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <FilterButton
                                        text="Shopping" 
                                    />
                                    <FilterButton
                                        text="Nightlife & Entertainment" 
                                    />
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <FilterButton
                                        text="Art Galleries" 
                                    />
                                    <FilterButton
                                        text="Sports & Recreation" 
                                    />
                                </View>
                                <FilterButton
                                    text="Scenic Drives & Routes" 
                                />
                            </View>
                        <TouchableOpacity style={styles.applyFilters}>
                            <Text style={{fontFamily: fonts.outfitRegular, color: '#FFFFFF', fontSize: 18}}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#232020",
    },
    closeIcon: {
        width: 33,
        height: 33,
        marginRight: 15,
        marginLeft: 15,
    },
    screenContent: {
        display: 'flex'
    },
    screenHeading: {
        fontSize: 29,
        color: '#FFFFFF',
        fontFamily: fonts.outfitBold,
    },
    categories: {
        fontSize: 20,
        color: '#D9D9D9',
        fontFamily: fonts.outfitRegular,
        marginTop: 20,
        marginLeft: 20,
    },
    // filters: {
    //     height: 505,
    //     width: 360,
    //     display: 'flex',
    //     flexDirection: 'row'
    // },
    applyFilters: {
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#57C2AF',
        borderRadius: 22,
        width: 143,
        height: 37,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FiltersScreen;