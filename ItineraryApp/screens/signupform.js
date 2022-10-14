import { ImageBackground, Stylesheet, Text, View, Platform, Dimensions, TouchableOpacity, Pressable } from 'react-native';
export default SignupForm

const image = { uri: "https://images.unsplash.com/photo-1492138195150-d71143066b68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"};

const SignupForm = () => (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>App Name</Text>
      </ImageBackground>
      



    </View>    

);