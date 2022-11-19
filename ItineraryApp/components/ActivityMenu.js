import { TouchableOpacity, Image, Text, View, Pressable, StyleSheet} from "react-native"
import React from "react";


const ActivityMenu = ({ name, image, activityType, changeActivityType}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View {...`${activityType === name.toLowerCase()}`}>
                <View>
                    <Image style ={styles.icon}
                        source={image}
                    />
                </View>
                <Text style={styles.text}>{name}</Text>
            </View>    
        </TouchableOpacity>
    )
}

export default ActivityMenu;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginLeft: 25,
        textAlign: 'center'
    },

    text: {
        fontSize: 17,
        color: '#744578',
    },
    icon: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    }
})