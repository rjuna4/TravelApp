import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { useLoadFonts, fonts } from '../components/FontLoader';

const ProfileSettings = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Settings</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileScreen')}
        style={styles.textContainer}>
        <View style={styles.textContainerInner}>
          <Text style={styles.mainOptionText}>My Profile</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          marginRight: 70,
          borderColor: '#AAA8A8',
        }}></View>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            'mailto:mmingo@luc.edu?subject=WanderList User Feedback&body=Dear Developers,',
          )
        }
        style={styles.textContainer}>
        <View style={styles.textContainerInner}>
          <Text style={styles.mainOptionText}>Provide feedback</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          marginRight: 70,
          borderColor: '#AAA8A8',
        }}></View>
      <TouchableOpacity
        onPress={() => Linking.openSettings('app-settings:')}
        style={styles.textContainer}>
        <View style={styles.textContainerInner}>
          <Text style={styles.mainOptionText}>Settings</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          marginRight: 70,
          borderColor: '#AAA8A8',
        }}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignupScreen')}
        style={styles.textContainer}>
        <View style={styles.textContainerInner}>
          <Text style={styles.LogoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
  textContainer: {
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    marginVertical: 5,
    textAlign: 'center',
    marginLeft: 15,
  },
  textContainerInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    fontSize: 30,
    color: 'black',
    fontWeight: '520',
    marginTop: 35,
    marginBottom: 15,
    fontFamily: fonts.outfitMediumRegular,
    marginLeft: 15,
  },
  mainOptionText: {
    alignContent: 'center',
    fontSize: 15,
    color: '#464545',
    fontWeight: '400',
    textAlign: 'center',
  },
  LogoutText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'red',
    fontWeight: 'bold',
  },
  lineDivider: {
    color: '#AAA8A8',
    height: 1,
    marginHorizontal: 0,
  },
});
