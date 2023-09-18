	import React, { useState } from 'react';
	import { View, TextInput, StyleSheet, Image } from 'react-native';
	import Icon from 'react-native-vector-icons/FontAwesome';


	const SearchBar = ({ data }) => {
	  const [query, setQuery] = useState('');
	  const handleSearch = () => {
	    // Implement your search logic here
	    const filteredData = data.filter(item =>
	      item.toLowerCase().includes(query.toLowerCase())
	    );
	    // Handle the filtered data as needed (e.g., update a state)
	    // Example: updateStateWithFilteredData(filteredData);
	  };
	  return (
	    <View style = {styles.container}>
	      <TextInput
	        style = {styles.textInput}
	        placeholder = "Where do you want to go?"
			placeholderTextColor = "#6C696C"
	        onChangeText = {text => setQuery(text)}
	        value = {query}
	        onSubmitEditing = {handleSearch}
	      />
	      <Image
	        name = "search"
	        size = {20}
	        onPress = {handleSearch}
			source={require('travel-app/assets/icons/icon_search_.png')}
			resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 21,
                                }}
	      />
	    </View>
	  );
	};
	const styles = StyleSheet.create({
	    container: {
	      flexDirection: 'row',
	      alignItems: 'center',
	      backgroundColor: '#F1EEEE',
		  top: 45,
		  paddingHorizontal: 20,
	      borderRadius: 25,
		  marginHorizontal: 16,
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