import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;


export default function EmojiPicker({isVisible, children, onClose}: Props){
    return(
        <View >
            {/**Modal to display stickers */}
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            {/**Modal content container and controls it's height, width and position */}
          <View style={styles.modalContent}>

            {/**Title container with title text and close button */}
            <View style={styles.titleContainer}>
                {/**Title text */}
              <Text style={styles.title}>Choose a Sticker</Text>
                {/**Close button */}
              <Pressable onPress={onClose}>
                <MaterialIcons name='close' color='#fff' size={22}/>
              </Pressable>
            </View>
            {children}
          </View>
        </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    modalContent: {
        height: '25%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        height: '28%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16,
    }

});