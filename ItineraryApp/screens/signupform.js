import { ImageBackground, Stylesheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
export default SignupForm

const image = { uri: "https://unsplash.com/photos/HL6gzlxnMjM"};

const SignupForm = () => (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>App Name</Text>
      </ImageBackground>
      



    </View>    

);