import { TouchableOpacity, Image, Text, View, Pressable, StyleSheet} from "react-native"
import React from "react";


const ActivityMenu = ({ name, image, activityType, changeActivityType}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View {...`${activityType === name.toLowerCase()}`}>
                <View style={{justifyContent: 'center'}}>
                    <Image style ={styles.icon}
                        source={image}
                    />
                    <Text style={styles.text}>{name}</Text>
                </View>
                {/* <Text style={styles.text}>{name}</Text> */}
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
        textAlign: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 16,
        color: '#744578',
        // marginHorizontal: -9,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 43,
        height: 43,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center'
    }
})