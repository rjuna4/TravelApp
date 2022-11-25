import {Icon, SafeAreaView, TextInput, ImageBackground, StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable, Image, FlatList } from 'react-native';
import React, { Component, useState, useLayoutEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from '@react-native-async-storage/async-storage';


const CreateItinerary = (data) => {
    return(
        <View>
            <Text>hi </Text>
            
        </View>
    )
}

export default CreateItinerary

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    localImage: {
      flex: 1,
      justifyContent: "center",
      height: 660,
      width: 420,
    },
})
