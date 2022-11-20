import {Component, useLayoutEffect, useState} from 'react';
import {Text, View, StyleSheet, StatusBar, Pressable, Image, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapTest from './mapsTest';
import DialogInput from 'react-native-dialog-input'

function map() { new Map();}


const textInput = () => {

  const[userInput, setUserInput] = useState('');
  const[dialogVisible, setDialogVisible] = useState(false);

  
  { userInput ?
      <Text style={styles.text}>{userInput}</Text>
      :
      <Text style={styles.text}>App</Text>
  }
  <DialogInput
    isDialogVisible={visible}
    title={"Create new itinerary"}
    hintInput={"Enter a name for itinerary"}
    submitInput={ (input) => {
      setUserInput(input),
      setDialogVisible(false)
    }}    
    closeDialog={() => setDialogVisible(false)}>
  </DialogInput>    

}   

const alert = () => {
  Alert.alert(
    'Add Activity to Itinerary',
    '',
    [
      {
        text: "Cancel",
      },
      {
        text: "Create new itinerary",
      },
      {
        text: "Add to existing itinerary",
        //onPress: () => textInput()
      }
    ]
  )
}


const MoreInformation = ({route}) => {
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
      }, []);
    const navigation = useNavigation();


    const data = route?.params?.param
    //map();
    return (
      <>
      <ScrollView>
        <StatusBar style="dark-content" />
        <View style={styles.container}>
          <Image style={styles.activityImage}
            source={
              {uri:
                data?.photo?.images?.large?.url 
                ? data?.photo?.images?.large?.url 
                : 'ItineraryApp/assets/icons/restaurant(1).png'}
            }
          />
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                <Image style={styles.backButton}
                  source={require('ItineraryApp/assets/icons/Refund_back.png')}
                 />   
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => alert()}>
                <Image style={styles.addButton}
                  source={require('ItineraryApp/assets/icons/Map_fill.png')}
                 /> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("BookmarksScreen", {param : data})}>
                <Image style={styles.saveButton}
                  source={require('ItineraryApp/assets/icons/Bookmark_fill(1).png')}
                 /> 
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.name}>{data?.name}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 3}}
                  source={require('ItineraryApp/assets/icons/Pin_fill.png')}
                />  
                <Text style={{fontSize: 17}}>Location</Text>
              </View>
              <Text style={styles.location}>{data?.location_string}</Text>
            </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{marginHorizontal: 5}}
                  source={require('ItineraryApp/assets/icons/File_dock.png')}
                />  
                <Text style={{fontSize: 17}}>Description</Text>
              </View>
            <View>
              <Text style={styles.description}>{data?.description}</Text>
            </View>
            <View>
            </View>
        </View>
      </ScrollView>  
        

      
      </>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: 'ABeeZee-Regular',
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  activityImage: {
    width: '95%',
    height: 260,
    borderRadius: 13,
    marginHorizontal: 10,
    top: 10
  },
  backButton: {
    width: 35,
    height: 35,
    tintColor: '#FFFFFF',
    marginTop: -235,
    marginHorizontal: 25,
  },
  addButton: {
    width: 35,
    height: 45,
    tintColor: '#FFFFFF',
    marginTop: -40,
    marginHorizontal: 25,
  },
  saveButton: {
    width: 30,
    height: 45,
    tintColor: '#FFFFFF',
    marginHorizontal: 355,
    marginTop: -45,
  },
  name: {
    fontSize: 25,
    marginTop: 7,
    marginHorizontal: 10,
  },
  location: {
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 2,
  }
  
});
export default MoreInformation;


