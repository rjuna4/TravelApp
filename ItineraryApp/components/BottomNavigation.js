import {createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/homescreen'
import ProfileScreen from '../screens/profilescreen'
import ItineraryListScreen from '../screens/itinerarylistscreen'
import BookmarksScreen from '../screens/bookmarksscreen'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'

const BottomNavigator = createBottomTabNavigator();

const BottomNavBar = () => {
    return (
        <BottomNavigator.Navigator 
            screenOptions={{
                "tabBarStyle": [{
                    position: 'absolute',
                    elevation: 0,

                    height: 60,
                    backgroundColor: '#744578'
                }]
            }}
            >
            
            <BottomNavigator.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icons/User_fill(1).png')}
                            resizeMode='contain'
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: focused ? '#DA5263' : '#FFFFFF',
                            }}
                        />    
                    </View>
                ),    
            }} />
            <BottomNavigator.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icons/Home_fill.png')}
                            resizeMode='contain'
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: focused ? '#DA5263' : '#FFFFFF',
                            }}
                        />    
                    </View>
                ),    
            }} />

            <BottomNavigator.Screen name="Itineraries" component={ItineraryListScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icons/Map_fill.png')}
                            resizeMode='contain'
                            style={{
                                width: 40,
                                height: 38,
                                tintColor: focused ? '#DA5263':'#FFFFFF'
                            }}
                        />    
                    </View>
                ),    
            }}/>
            <BottomNavigator.Screen name="Bookmarks" component={BookmarksScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icons/Bookmark_fill(1).png')}
                            resizeMode='contain'
                            style={{
                                width: 40,
                                height: 35,
                                tintColor: focused ? '#DA5263' : '#FFFFFF'
                            }}
                        />    
                    </View>
                ),    
            }}/>
            </BottomNavigator.Navigator>
    )
}

export default BottomNavBar;