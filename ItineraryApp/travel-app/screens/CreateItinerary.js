import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, View, Text, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList, ScrollView, FlatList, Touchable, useEffect} from 'react-native';
import React, { Component, useState, useLayoutEffect} from 'react';
import HeaderBanner from '../components/HeaderBanner';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Itineraries from './Itineraries';
import { fonts } from '../components/FontLoader';
import * as ImagePicker from 'expo-image-picker';
import { format } from 'date-fns';
import ItineraryActivity from '../components/ItineraryActivity';

const CreateItinerary = ({route, navigation}) => {
    const {itineraryData: existingItineraryData } = route.params || { itineraryData: [] };
    //const {activityData} = route.params;
    const [itineraryData, setItineraryData] = useState(existingItineraryData);
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const handleDateChange = (date) => {
        // Implement logic to update selectedDates
      };
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const onChangeDate = (event, selectedDates) => {
        if (event.type === 'set' && selectedDates) {
            if (startDate && selectedDates.toDateString() === startDate.toDateString()) {
                // If the user selects the start date again, reset it to null
                setStartDate(null);
        } else if (!startDate) {
            // Set the start date
            setStartDate(selectedDates);
            setSelectedDates([selectedDates]);
        } else if (selectedDates > startDate) {
            // Set the end date if it's greater than the start date
            setEndDate(selectedDates);
            setSelectedDates(getDatesInRange(startDate, selectedDates));
        } else {
            // Clear the start and end dates if a new start date is selected
            setStartDate(selectedDates);
            setEndDate(null);
            setSelectedDates([selectedDates]);
        }

        // if (!startDate || !endDate) {
        //     return {}; // No styling if no start or end date
        //   }
        
        //   if (date >= startDate && date <= endDate) {
        //     return { backgroundColor: 'green', color: 'green' }; // Style for dates within the range
        //   }
        
        //   return {}; // Default style for other dates
        }
      };
      
    // const dateStyle = (date) => {
    //     if (!startDate || !endDate) {
    //       return {}; // No styling if no start or end date
    //     }
      
    //     if (date >= startDate && date <= endDate) {
    //       return { backgroundColor: 'green', color: 'green' }; // Style for dates within the range
    //     }
      
    //     return {}; // Default style for other dates
    //   };

    const CustomDate = ({ date, startDate, endDate }) => {
        const isInRange = date >= startDate && date <= endDate;
        const isSelected = date === startDate || date === endDate;
        return (
        <View
            style={{
                backgroundColor: isInRange ? 'blue' : 'transparent',
                borderRadius: isSelected ? 15 : 0,
                padding: 5,
            }}
            >
        <Text style={{ color: isSelected ? 'white' : 'black' }}>{date.getDate()}</Text>
        </View>
        )
    }

    const getDatesInRange = (start, end) => {
        const dates = [];
        let currentDate = new Date(start);
        while (currentDate <= end) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
      };

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

    const saveItinerary = () => {
      if (selectedImage && title) {
        //const formattedDate = format(selectedDate, 'MM-dd-yyyy')
        //const formattedTime = format(selectedStartTime, 'HH:mm')
        const newItinerary = {
          // selectedImage,
          // title,
          //selectedDate: formattedDate,
          //selectedStartTime: formattedTime,
          selectedImage,
          title,
        }
        const updatedItineraryData = [...itineraryData, newItinerary];
        //console.log(updatedItineraryData);
         setSelectedImage(null);
         setTitle('');
         setItineraryData(updatedItineraryData);
          navigation.navigate('Tabs', { itineraryData: updatedItineraryData });
          console.log("made it past save button");
        [updatedItineraryData, navigation];
    }
      }
      //selectedDates: selectedDates,
          //selectedStartTime: selectedStartTime });
        //console.log(updatedItineraryData)
    
    

    async function saveCreatedToDatabase() {
      if (selectedImage && title && selectedDates) {
         formattedDate = format(selectedDates, 'MM-dd-yyyy');
        //const formattedTime = format(selectedStartTime, 'HH:mm');
        const newItinerary = {
          itineraryImageFileName: selectedImage,
          itineraryTitle: title,
          itineraryStartDate: startDate,
          itineraryEndDate: endDate,
        };

        try {
          const response = await fetch('http://172.20.10.7:8082/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: '6386857fce851928b24c6b4f',
              ...newItinerary,
            }),
          });
    
          if (response.status === 200) {
            alert('Itinerary saved successfully');
          } else {
            const data = await response.json();
            alert(`Error: ${data.error}`);
          }
        } catch (error) {
          console.error(error);
          alert('An error occurred while saving the .');
        }
      } else {
        alert('Please fill in all the required fields.');
      }
    }

    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Itineraries')}>
                <Image style={styles.backButton}
                  source={require('travel-app/assets/icons/Refund_back.png')}
                 />   
        </TouchableOpacity>
        <HeaderBanner heading = "Create Itinerary" style={styles.banner}>
        </HeaderBanner>
        <View>
        <TextInput
        placeholder="Name Your Itinerary"
        placeholderTextColor="#FFFFFF"
        value={title}
        onChangeText={setTitle}
        style={{ fontSize: 25, borderBottomWidth: 1, margin: 20, textAlign: "center", color: '#FFFFFF', paddingBottom: 10 , borderColor: "#FFFFFF" }}
        />
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

        <Text style={styles.text}>
            Select the dates for your trip:
        </Text>

        <DateTimePicker
          style={{alignSelf: "center", borderRadius: 10, overflow: 'hidden'}}
          backgroundColor="#818181"
          borderBottomWidth="10"
          testID="dateTimePicker"
          value={startDate || new Date()} // Set the initial date
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()} // Disable past dates
          maximumDate={new Date('2024-12-31')} // Limit to the end of 2024
          locale="en_US" // Customize the locale as needed
          renderDayContents={(date) => (
            <CustomDate date={date} startDate={startDate} endDate={endDate} />
          )}
        />
        {/* <Text style={styles.text}>{startDate.toDateString() + " - " + endDate.toDateString()}</Text> */}
        <View>
        <Text style={styles.text}>Start Date: {startDate ? startDate.toDateString() : 'Select a date'}</Text>
        <Text style={styles.text}>End Date: {endDate ? endDate.toDateString() : 'Select a date'}</Text>
      </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveItinerary}>
              <Text style={{color: '#FFFFFF', fontFamily: fonts.outfitMedium, fontSize: 18}}>Save</Text>
            </TouchableOpacity>
    </View>
    );
};

export default CreateItinerary;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#232020",
        position: 'relative'
      },
    text: {
        fontSize: 20,
        color: '#FFFFFF',
        margin: 20
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
      alignSelf: "center",
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
        zIndex: 2
    },
    saveButton: {
      backgroundColor: '#57C2AF',
      width: 114,
      height: 37,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      marginBottom: 200,
    }

})
