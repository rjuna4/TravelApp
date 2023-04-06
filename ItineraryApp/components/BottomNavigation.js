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
import { cyan100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const BottomNavBar = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ItineraryStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const BookmarkStack = createNativeStackNavigator();

const ItinerariesStackTab = () => {
    return(
        <HomeStack.Navigator initialRouteName="Itineraries">
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
        <ItineraryStack.Navigator initialRouteName="ItineraryListScreen">
         <ItineraryStack.Screen name="ItineraryListScreen" component={ItineraryListScreen} options={{headerShown: false}}/>
      </ItineraryStack.Navigator>
    )
}

const BookmarksStackTab = () => {
    return(
        <BookmarkStack.Navigator initialRouteName="BookmarksScreen">
         <BookmarkStack.Screen name="BookmarksScreen" component={BookmarksScreen} options={{headerShown: false}}/>
         <BookmarkStack.Screen name="MoreInformation" component={MoreInformation} /> 
      </BookmarkStack.Navigator>
    )
}

const ProfileStackTab = () => {
    return(
        <ProfileStack.Navigator initialRouteName="ProfileScreen">
         <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
         <ProfileStack.Screen name="MoreInformation" component={MoreInformation} />
         <ProfileStack.Screen name="ProfileSettings" component={ProfileSettings} />
      </ProfileStack.Navigator>
    )
}

const MessagesStackTab = () => {
    return(
        <ProfileStack.Navigator initialRouteName="ProfileScreen">
         <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
         <ProfileStack.Screen name="MoreInformation" component={MoreInformation} />
         <ProfileStack.Screen name="ProfileSettings" component={ProfileSettings} />
      </ProfileStack.Navigator>
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
            
           
            
            <BottomNavBar.Screen name="Itineraries" component={ItinerariesStackTab}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('ItineraryApp/assets/icons/itineraries.png')}
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
                    //color: '#FFFFFF',
                    //tintColor: focused ? '#00F3C8' : '#FFFFFF',
                }
            }} />


        <BottomNavBar.Screen name="People" component={ProfileStackTab}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('ItineraryApp/assets/icons/User_alt_light.png')}
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
                    color: '#FFFFFF'
                }
            }} />

            <BottomNavBar.Screen name="Home" component={ItineraryStackTab} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('ItineraryApp/assets/icons/home.png')}
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
                    color: '#FFFFFF'
                }
            }}/>
            <BottomNavBar.Screen name="Groups" component={BookmarksStackTab} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('ItineraryApp/assets/icons/Group_add_light(1).png')}
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
                    color: '#FFFFFF'
                }
            }}/>

            <BottomNavBar.Screen name="Messages" component={MessagesStackTab}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('ItineraryApp/assets/icons/messages.png')}
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
                    color: '#FFFFFF'
                }
            }} />
            </BottomNavBar.Navigator>
    )
}

export default BottomNavBar;
