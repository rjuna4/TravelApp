import React, {Component} from 'react';
import {Button} from 'react-native';
import SignupScreen from './screens/signupscreen';
import SignupForm from './screens/signupform';
import LoginForm from './screens/loginform';
import MoreInformation from './screens/moreInformation';
import HomeScreen from './screens/homescreen';
import ProfileScreen from './screens/profilescreen';
import ProfileSettings from './screens/profileSettings';
import BookmarksScreen from './screens/bookmarksscreen';
import ItineraryListScreen from './screens/itinerarylistscreen';
import ViewItinerary from './screens/viewitinerary';
//Navigation Imports
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from './components/BottomNavigation';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignupScreen">
          <Stack.Screen name="Tabs" component={BottomNavigator} options={{headerShown: false}} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown: false}}/>
          <Stack.Screen name="SignupForm" component={SignupForm} options={{headerShown: false}}/>
          <Stack.Screen name="LoginForm" component={LoginForm} options={{headerShown: false}}/>
          <Stack.Screen name="ViewItinerary" component={ViewItinerary} options={{headerShown: false}}/>
          <Stack.Screen name="ProfileSettings" component={ProfileSettings} options={{headerShown: false}}/>
        </Stack.Navigator>
        {/* <BottomNavigator /> */}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
