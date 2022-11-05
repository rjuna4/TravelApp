import React, {Component} from 'react';
import {Button} from 'react-native';
import SignupScreen from './screens/signupscreen';
import SignupForm from './screens/signupform';
import LoginForm from './screens/loginform';
import MoreInformation from './screens/moreInformation';
//Navigation Imports
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MoreInformation">
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="SignupForm" component={SignupForm} />
          <Stack.Screen name="LoginForm" component={LoginForm} />
          <Stack.Screen name="MoreInformation" component={MoreInformation} />
        </Stack.Navigator>
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
