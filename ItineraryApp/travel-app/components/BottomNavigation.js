// Navigation and other Imports
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// Screen Imports
import SignupScreen from '../screens/signupscreen';
import SignupForm from '../screens/signupform';
import LoginForm from '../screens/loginform';
import MoreInformation from '../screens/moreInformation';
import HomeScreen from '../screens/homescreen';
import ProfileScreen from '../screens/profilescreen';
import BookmarksScreen from '../screens/bookmarksscreen';
import ItineraryListScreen from '../screens/itinerarylistscreen';
import Itineraries from '../screens/Itineraries';
import ProfileSettings from '../screens/profileSettings';
import Groups from '../screens/Groups';
import People from '../screens/People';
import Messages from '../screens/Messages';
import ActivityRecommendations from '../screens/activityRecommendations';
import CreateItinerary from '../screens/CreateItinerary';

const BottomNavBar = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ItineraryStack = createNativeStackNavigator();
const GroupStack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
const PeopleStack = createNativeStackNavigator();

const HomeStackTab = () => {
    return(
        <HomeStack.Navigator initialRouteName="HomeScreen">
         <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
         <HomeStack.Screen name="MoreInformation" component={MoreInformation} /> 
         <HomeStack.Screen name="ItineraryListScreen" component={ItineraryListScreen} options={{headerShown: false}}/>
         <HomeStack.Screen name="BookmarksScreen" component={BookmarksScreen} options={{headerShown: false}}/>
         <HomeStack.Screen name="Itineraries" component={Itineraries} options={{headerShown: false}}/>
      </HomeStack.Navigator>
    )
}

const ItineraryStackTab = () => {
    return(
        <ItineraryStack.Navigator initialRouteName="Itineraries">
         <ItineraryStack.Screen name="Itineraries" component={Itineraries} options={{headerShown: false}}/>
         <ItineraryStack.Screen name="ActivityRecommendations" component={ActivityRecommendations} /> 
         <ItineraryStack.Screen name="CreateItinerary" component={CreateItinerary} options={{headerShown: false}}/>
      </ItineraryStack.Navigator>
    )
}

const GroupsStackTab = () => {
    return(
        <GroupStack.Navigator initialRouteName="Groups">
         <GroupStack.Screen name="Groups" component={Groups} options={{headerShown: false}}/>
      </GroupStack.Navigator>
    )
}

const MessagesStackTab = () => {
    return(
        <MessagesStack.Navigator initialRouteName="Messages">
         <MessagesStack.Screen name="Messages" component={Messages} options={{headerShown: false}}/>
      </MessagesStack.Navigator>
    )
}
const PeopleStackTab = () => {
    return(
        <PeopleStack.Navigator initialRouteName="People">
         <PeopleStack.Screen name="People" component={People} options={{headerShown: false}}/>
      </PeopleStack.Navigator>
    )
}


export function BottomNavigator() {
    return (
        <BottomNavBar.Navigator
            screenOptions={{
                "tabBarStyle": [{
                    position: 'absolute',
                    elevation: 0,
                    height: 60,
                    backgroundColor: '#222222'
                }]
            }}
            >
            
           
            
            <BottomNavBar.Screen name="Itineraries" component={ItineraryStackTab}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('travel-app/assets/icons/itineraries.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginBottom: -5,
                                    tintColor: focused ? '#00F3C8' : '#FFFFFF',
                                }}
                            />    
                    </View>
                ),    
                tabBarLabelStyle: {
                    fontSize: 13,
                    color: '#FFFFFF',
                    marginBottom: 5,
                }
            }} />


        <BottomNavBar.Screen name="People" component={PeopleStackTab}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('travel-app/assets/icons/User_alt_light.png')}
                                resizeMode='contain'
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginBottom: -5,
                                    tintColor: focused ? '#00F3C8' : '#FFFFFF',
                                }}
                        />    
                    </View>
                ),    
                tabBarLabelStyle: {
                    fontSize: 13,
                    color: '#FFFFFF',
                    marginBottom: 5,
                }
            }} />

            <BottomNavBar.Screen name="Home" component={HomeStackTab} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('travel-app/assets/icons/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 33,
                                    height: 24,
                                    marginBottom: -5,
                                    tintColor: focused ? '#00F3C8':'#FFFFFF'
                                }}
                        />    
                    </View>
                ),    
                tabBarLabelStyle: {
                    fontSize: 13,
                    color: '#FFFFFF',
                    marginBottom: 5
                }
            }}/>
            <BottomNavBar.Screen name="Groups" component={GroupsStackTab} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('travel-app/assets/icons/Group_add_light(1).png')}
                                resizeMode='contain'
                                style={{
                                    width: 55,
                                    height: 40,
                                    marginBottom: -10,
                                    tintColor: focused ? '#00F3C8' : '#FFFFFF',
                                }}
                        />    
                    </View>
                ),    
                tabBarLabelStyle: {
                    fontSize: 13,
                    color: '#FFFFFF',
                    marginBottom: 5,
                }
            }}/>

            <BottomNavBar.Screen name="Messages" component={MessagesStackTab}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('travel-app/assets/icons/messages.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginBottom: -10,
                                    tintColor: focused ? '#00F3C8' : '#FFFFFF',
                                }}
                        />    
                    </View>
                ),    
                tabBarLabelStyle: {
                    fontSize: 13,
                    color: '#FFFFFF',
                    marginBottom: 5,
                }
            }} />
            </BottomNavBar.Navigator>
    )
}

export default BottomNavBar;
