import {Component, useLayoutEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, Pressable, Image, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapTest from './mapsTest';

function map() { new Map();}

const alert = () => 
  Alert.alert(
    'Add Activity to Itinerary',
    '',
    [
      {
        text: "Cancel"
      },
      {
        text: "Create new itinerary",
      },
      {
        text: "Add to existing itinerary",
        //onPress: () => navigation.navigate('ItineraryListScreen')
      }
    ]
  )


const MoreInformation = ({route}) => {
      useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
      }, []);
    const navigation = useNavigation();


    const data = route?.params?.param

    console.log("data: ", data)
    map();
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
              <TouchableOpacity>
                <Image style={styles.saveButton}
                  source={require('ItineraryApp/assets/icons/Bookmark_fill(1).png')}
                 /> 
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.name}>{data?.name}</Text>
              <Text style={styles.location}>{data?.location_string}</Text>
            </View>
            <View>
              <Text style={styles.description}>{data?.description}</Text>
            </View>
            <View>
            </View>
        </View>
      </ScrollView>  
        

        <View style={styles.conatiner}>
          <View style={styles.dockContainer}></View>
          <View style={styles.buttonOuterContainerAdd}>
            <Pressable
              style={({pressed}) =>
                pressed
                  ? [styles.buttonInnerContainerAdd, styles.pressed]
                  : styles.buttonInnerContainerAdd
              }
              android_ripple={{color: '#154182'}}>
              <Text style={styles.text}>Add</Text>
            </Pressable>
          </View>


          <View style={styles.buttonOuterContainerSave}>
            <Pressable
              style={({pressed}) =>
                pressed
                  ? [styles.buttonInnerContainerSave, styles.pressed]
                  : styles.buttonInnerContainerSave
              }
              android_ripple={{color: '#154182'}}>
              <Image></Image>
              <Text style={styles.text}>Save</Text>
            </Pressable>
            <TouchableOpacity style ={styles.alert} onPress={() => alert()}>
            <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    //TBD
  },
  dockContainer: {
    backgroundColor: '#744578',
    height: 70,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonInnerContainerAdd: {
    backgroundColor: '#1D54A6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonOuterContainerAdd: {
    borderRadius: 13,
    position: 'absolute',
    bottom: 80,
    right: 200,
    margin: 4,
    marginBottom: 20,
    width: 100,
    overflow: 'hidden',
  },
  buttonInnerContainerSave: {
    backgroundColor: '#1D54A6',
    paddingVertical: 8,
    paddingHorizontal: 18,
    elevation: 2,
  },
  buttonOuterContainerSave: {
    borderRadius: 13,
    position: 'absolute',
    bottom: 80,
    left: 200,
    margin: 4,
    marginBottom: 20,
    marginHorizontal: 20,
    width: 100,
    overflow: 'hidden',
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
  },
  description: {
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: 2,
  }
  
});
export default MoreInformation;


