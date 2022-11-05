import {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
} from 'react-native';

class MoreInformation extends Component {
  render() {
    return (
      <>
        <StatusBar style="dark-content" />
        <View style={styles.conatiner}>
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
          </View>
          <Text></Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    //TBD
  },
  dockContainer: {},
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
    width: 100,
    overflow: 'hidden',
  },
  buttonInnerContainerSave: {
    backgroundColor: '#1D54A6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    elevation: 2,
  },
  buttonOuterContainerSave: {
    borderRadius: 13,
    position: 'absolute',
    bottom: 80,
    left: 200,
    margin: 4,
    marginHorizontal: 20,
    width: 100,
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'ABeeZee',
    color: 'white',
    fontSize: 28,
    textAlign: 'right',
  },
  button: {},
  pressed: {
    opacity: 0.75,
  },
});
export default MoreInformation;
