import { TouchableOpacity, Image, Text, View, Pressable, StyleSheet} from "react-native"
import React from "react";


const ActivityMenu = ({ name, image, activityType, changeActivityType}) => {
    return (
        <TouchableOpacity>
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
    text: {
        fontSize: 18,
        color: '#744578'
    },
    icon: {
        width: 65,
        height: 65,
    }


})