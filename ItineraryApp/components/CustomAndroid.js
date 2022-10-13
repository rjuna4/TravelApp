import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomAndroid = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Custom Android Fonts</Text>
            <Text style={{ fontFamily: 'ABeeZee-Regular'}}>ABeeZee-Regular</Text>
            <Text style={{ fontFamily: 'ABeeZee-Italic'}}>ABeeZee-Regular</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        padding: 20,
    },
    titleText: {
        textAlign: 'center',
    }
})

export default CustomAndroid
