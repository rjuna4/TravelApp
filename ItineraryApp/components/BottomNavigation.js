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
import ViewItinerary from '../screens/viewitinerary';
import ProfileSettings from '../screens/profileSettings';

const BottomNavBar = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ItineraryStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const BookmarkStack = createNativeStackNavigator();

const HomeStackTab = () => {
    return(
        <HomeStack.Navigator initialRouteName="HomeScreen">
         <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
         <HomeStack.Screen name="MoreInformation" component={MoreInformation} /> 
         <HomeStack.Screen name="ItineraryListScreen" component={ItineraryListScreen} options={{headerShown: false}}/>
         <HomeStack.Screen name="BookmarksScreen" component={BookmarksScreen} options={{headerShown: false}}/>
         <HomeStack.Screen name="ViewItinerary" component={ViewItinerary} options={{headerShown: false}}/>
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


export function BottomNavigator() {
    return (
        <BottomNavBar.Navigator
            screenOptions={{
                "tabBarStyle": [{
                    position: 'absolute',
                    elevation: 0,

                    height: 60,
                    backgroundColor: '#A067A5'
                }]
            }}
            >
            
           
            
            <BottomNavBar.Screen name="Home" component={HomeStackTab} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('../assets/icons/Home_fill.png')}
                                resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 40,
                                    tintColor: focused ? '#FF8BDF' : '#FFFFFF',
                                }}
                            />    
                    </View>
                ),    
                tabBarLabelStyle: {
                    fontSize: 13,
                    color: '#FFFFFF'
                }
            }} />


        <BottomNavBar.Screen name="Profile" component={ProfileStackTab}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('../assets/icons/User_fill(1).png')}
                                resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 40,
                                    tintColor: focused ? '#FF8BDF' : '#FFFFFF',
                                }}
                        />    
                    </View>
                ),    
                tabBarLabelStyle: {
                    fontSize: 13,
                    color: '#FFFFFF'
                }
            }} />

            <BottomNavBar.Screen name="Itineraries" component={ItineraryStackTab} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('../assets/icons/Map_fill.png')}
                                resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 38,
                                    tintColor: focused ? '#FF8BDF':'#FFFFFF'
                                }}
                        />    
                    </View>
                ),    
                tabBarLabelStyle: {
                    fontSize: 13,
                    color: '#FFFFFF'
                }
            }}/>
            <BottomNavBar.Screen name="Bookmarks" component={BookmarksStackTab} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={require('../assets/icons/Bookmark_fill(1).png')}
                                resizeMode='contain'
                                style={{
                                    width: 40,
                                    height: 35,
                                    tintColor: focused ? '#FF8BDF' : '#FFFFFF',
                                }}
                        />    
                    </View>
                ),    
                tabBarLabelStyle: {
                    fontSize: 13,
                    color: '#FFFFFF'
                }
            }}/>
            </BottomNavBar.Navigator>
    )
}

export default BottomNavBar;
