	import React, { useState } from 'react';
	import { View, TextInput, StyleSheet, Image } from 'react-native';
	import Icon from 'react-native-vector-icons/FontAwesome';
	import Itineraries from '../screens/Itineraries';


	const SearchBar = ({placeholder, onChangeText, value, handleSearch}) => {
	  return (
		<View style={styles.outercontainer}>
			<View style = {styles.container}>
			<TextInput
				style = {styles.textInput}
				placeholder = {placeholder}
				placeholderTextColor = "#6C696C"
				onChangeText={onChangeText}
          		value={value}
				onSubmitEditing = {handleSearch}
			/>
			<Image
				name = "search"
				onPress = {handleSearch}
				source={require('travel-app/assets/icons/icon_search_.png')}
				resizeMode='contain'
				style={{width: 30,height: 21,}}
			/>
			</View>
		</View>
	  );
	};
	const styles = StyleSheet.create({
		outercontainer: {
		  display: "flex",
		  flexDirection: "row",
		  justifyContent: "center"
		},
	    container: {
	      flexDirection: 'row',
	      alignItems: 'center',
	      backgroundColor: '#F1EEEE',
		  top: 45,
		  paddingHorizontal: 20,
	      borderRadius: 25,
		  width: 340,
		  height: 45
	    },
	    textInput : {
	      flex: 1,
	    },
	    image: {
	      padding: 10,
	    },
	  });
	  
  export default SearchBar;