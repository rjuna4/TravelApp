import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, View, Text, Platform, Dimensions, TouchableOpacity, Pressable, Image, VirtualizedList, ScrollView, FlatList, Touchable} from 'react-native';
import React, { Component, useState, useLayoutEffect} from 'react';
import HeaderBanner from '../components/HeaderBanner';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateItinerary = ({navigation}) => {

    const [title, setTitle] = useState('');
    const [selectedDates, setSelectedDates] = useState([]);
    const handleDateChange = (date) => {
        // Implement logic to update selectedDates
      };
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    const onChange = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            if (startDate && selectedDate.toDateString() === startDate.toDateString()) {
                // If the user selects the start date again, reset it to null
                setStartDate(null);
        } else if (!startDate) {
            // Set the start date
            setStartDate(selectedDate);
            setSelectedDates([selectedDate]);
        } else if (selectedDate > startDate) {
            // Set the end date if it's greater than the start date
            setEndDate(selectedDate);
            setSelectedDates(getDatesInRange(startDate, selectedDate));
        } else {
            // Clear the start and end dates if a new start date is selected
            setStartDate(selectedDate);
            setEndDate(null);
            setSelectedDates([selectedDate]);
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
        <View
            style={{
                backgroundColor: isInRange ? 'blue' : 'transparent',
                borderRadius: isSelected ? 15 : 0, // Add border radius for selected dates
                padding: 5,
            }}
            >
        <Text style={{ color: isSelected ? 'white' : 'black' }}>{date.getDate()}</Text>
        </View>
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

    return (
    <View style={styles.container}>
        <HeaderBanner heading = "Create Itinerary" style={styles.banner}>
        </HeaderBanner>
        <TextInput
        placeholder="Name Your Itinerary"
        placeholderTextColor="#FFFFFF"
        value={title}
        onChangeText={setTitle}
        style={{ fontSize: 25, borderBottomWidth: 1, margin: 20, textAlign: "center", color: '#FFFFFF', paddingBottom: 10 , borderColor: "#FFFFFF" }}
        />
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
          onChange={onChange}
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

        <TouchableOpacity 
        style={styles.save}
        title="Save Itinerary"
        onPress={() => {
            // Implement logic to save the itinerary
            // You can use the 'title' and 'selectedDates' state here
        }}
        />
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
    save: {
        flex: 1,
        color: '#FFFFFF',
        width: 60,
        height: 30
    }
})
