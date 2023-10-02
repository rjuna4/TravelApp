import React, { Component, useState, useLayoutEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Image} from 'react-native';
import HeaderBanner from '../components/HeaderBanner';
import Groups from './Groups';
import { fonts } from '../components/FontLoader';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker';
//import DatePicker from '@react-native-community/datetimepicker'

const CreateGroup = ({route}) => {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const toggleDatePicker = () => {
        setDatePickerVisible(!isDatePickerVisible);
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.uri);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    const [tabColor, changeColor] = useState("#00F3C8");
    const [tab2Color, changeColor2] = useState("#FFFFFF");
    const [activeTab, setActiveTab] = useState(1);

    const changeTab = (tabNum) => {
        setActiveTab(tabNum);
        changeColor(tabNum === 1 ? '#00F3C8' : "#00F3C8");
        changeColor2(tabNum === 2 ? '#00F3C8' : "#FFFFFF");
    }

    return (
        <View style={styles.container}>
          <View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Groups')}>
                <Image style={styles.backButton}
                  source={require('travel-app/assets/icons/Refund_back.png')}
                 />   
              </TouchableOpacity>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={styles.heading}>Add Title</Text>
              </View>
              <View>
                  <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        {selectedImage ? (
                            <Image style={styles.selectedImage} source={{uri: selectedImage }} />
                        ) : (
                            <Image style={styles.cameraIcon}
                            source={require('travel-app/assets/icons/camera.png')}
                        />   
                        )}
                    </TouchableOpacity>
                  </View>
              </View>
              <View style={styles.tabs}>
                <View style={styles.tabContainer}>
                  <Text
                    style={[
                      styles.tabs,
                      {
                        color: activeTab === 1 ? tabColor : '#FFFFFF',
                      },
                    ]}
                    onPress={() => changeTab(1)}
                  >
                    Public
                  </Text>
                  {activeTab === 1 && (
                    <View style={styles.underline} />
                  )}
                </View>
              <View style={styles.tabContainer}>
                <Text
                  style={[
                    styles.tabs,
                    {
                      color: activeTab === 2 ? tab2Color : '#FFFFFF',
                      textDecoration: 'underline',
                    }
                  ]}
                  onPress={() => changeTab(2)}
                >
                  Private
                </Text>
                {activeTab === 2 && (
                  <View style={styles.underline2} />
                )}
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleDatePicker()}>
                <Image style={styles.dateIcon}
                  source={require('travel-app/assets/icons/date.png')}
                 />   
            </TouchableOpacity>
            {isDatePickerVisible && (
                <DatePicker
                    style={{width: 200, zIndex: 5,}}
                    date={selectedDate}
                    mode="date"
                    placeholder="Select date"
                    format="YYYY-MM-DD"
                    minDate="2020-01-01"
                    maxDate="2030-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateInput: {
                            borderWidth: 0,
                        },
                    }}
                    onDateChange={(date) => {
                        setSelectedDate(date);
                        toggleDatePicker();
                    }}
                    />
            )}
            </View>
          </View>
      </View>  
    )  
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#232020",
    },
    heading: {
        fontFamily: fonts.outfitMedium,
        fontSize: 30,
        color: '#FFFFFf',
    },
    backButton: {
        width: 30,
        height: 30,
        marginTop: 50,
        marginLeft: 15,
    },
    imageContainer: {
        width: 328,
        height: 186,
        borderRadius: 4,
        backgroundColor: '#D9D9D9',
        marginLeft: 22,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedImage: {
        width: 328,
        height: 186,
        borderRadius: 4,
    },
    cameraIcon: {
        width: 70,
        height: 60,
        zIndex: 2,
    },
    tabs: {
        fontFamily: fonts.outfitMedium,
        fontSize: 18,
        color: "#FFFFFF",
        justifyContent: 'center',
        flexDirection: 'row',
        top: 10,
        marginHorizontal: 55,
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    underline: {
        height: 2, // Adjust the thickness here
        backgroundColor: '#00F3C8', // Adjust the color here
        position: 'absolute',
        top: 37,
        left: 49,
        right: 0,
        width: 63
      },
      underline2: {
        height: 2, // Adjust the thickness here
        backgroundColor: '#00F3C8', // Adjust the color here
        position: 'absolute',
        top: 37,
        left: 49,
        right: 0,
        width: 70
      },
      dateIcon: {
          width: 20,
          height: 20,
          marginTop: 40,
          marginLeft: 20,
      }

})

export default CreateGroup;