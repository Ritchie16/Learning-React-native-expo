import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";


import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import IconButton from '@/components/IconButton';
import ImageViewer from "@/components/ImageViewer";
import EmojiPicker from '@/components/EmojiPicker';

const PlaceholderImage = require('@/assets/images/background-image.png');


export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);


  const pickImageAsync = async () => {
    //the function launchImageLibraryAsync opens the image gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], //only images
      allowsEditing: true, //allow user to edit the image
      quality: 1, //highest quality and other quality values are 0 to 1
  
    });

    //if the user did not cancel the process
    if(!result.canceled){
      //the result object contais an array called assets and first elemenet is an object with uri property
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true); //show the app options
    }
    else {
      alert('You did not select any image.');
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  }

  const onSaveImageAsync = () => {
    //will be implemented later
  }
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer} >
        {/**pass the placeholder image and selected image to ImageViewer, if selectedImage is defined it will be the one to be displayed */}
       <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>

      {
        showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>

              {/**pass the refresh prop icon tother with Reset function that hide all buttons */}
              <IconButton icon='refresh' label='Reset' onPress={onReset} />

              {/**pass the add sticker icon prop to CircleButton */}
              <CircleButton onPress={onAddSticker} />

              {/**pass the save icon prop to IconButton */}
              <IconButton icon='save-alt' label='save' onPress={onSaveImageAsync} />
            </View>
          </View>  
        ) : (
          <View style={styles.footerContainer} >
          {/**passing the props including a prop to select an image to Pressable */}
          <Button label="Choose a photo" theme='primary' onPress={pickImageAsync}/>
          <Button label="Use this photo" onPress={
            () => setShowAppOptions(true)
          } />
      </View>  
        )
      }

      {/**Emoji picker modal */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose} >
        {/**stickers will be added here later */}
      </EmojiPicker>
    </View>
  );
}


const styles = StyleSheet.create({
  //whole screen container
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: "center",
  },
  //for image displayed
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  //for buttons container
  footerContainer: {
    
    alignItems: 'center',
    width: '90%',
    
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});