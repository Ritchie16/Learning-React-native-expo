import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


type Props = {
    label: string,
}

export default function Button({label}:  Props){
    return(
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button}  onPress={() => alert('You pressed a button.')}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>    
    )

}

const styles = StyleSheet.create({
    //wrapper for a single button
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    //single button style
    button: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#805151ff',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        //text style for button label
        color: '#fff',
        fontSize: 16,
    },
    });