import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
    icon: keyof typeof MaterialIcons.glyphMap; // thie means the icon prop must be a valid icon name from MaterialIcons
    label: string;
    onPress: () => void;
}


export default function IconButton({icon, label, onPress}: Props){
    return(
        <Pressable style={styles.IconButton} onPress={onPress} >
            <MaterialIcons name={icon} size={24} color='#fff'/>
            <Text style={styles.IconButtonLabel}>{label}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    IconButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    IconButtonLabel: {
        color: '#fff',
        marginTop: 12,
              
    }
})