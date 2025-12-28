import domtoimage from 'dom-to-image';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from "react";
import { ImageSourcePropType, Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';




import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiList from '@/components/EmojiList';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiSticker from '@/components/EmojiSticker';
import IconButton from '@/components/IconButton';
import ImageViewer from "@/components/ImageViewer";


const PlaceholderImage = require('@/assets/images/background-image.png');


export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  //stores the permission statues
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  //store the reference of where screenshot will be taken and it's get mounted to targeed View element
  const imageRef = useRef<View>(null);

  //IN PRODUCTION THIS LOGIC IS BAD FOR UX - USER HAS NO KNOWLEDGE TO WHY PERMISSION IS NECESSARY
  //check if the permission to accessing device media library is null or granted, if null request
  useEffect(() => {
    if(!permissionResponse?.granted){
      requestPermission();
    }
  }, []);

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

  //closes icon buttons by setting to false
  const onReset = () => {
    setShowAppOptions(false);
  }

  //open the stikcer modal by setting it ti visible
  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  //closes the sticker modal
  const onModalClose = () => {
    setIsModalVisible(false);
  }

  //logic to take a screenshot and save to media gallery
  const onSaveImageAsync = async () => {
    //checks the platform either web or native and adjust logic
    if (Platform.OS !== 'web') {
      try {
        //checks permission before taking screenshot
        if (!permissionResponse?.granted) {
          await requestPermission();
          alert("Access allowed. Tap Save again to save your image.");
          return;
        }

        //captures a screenshot and return a uri
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        //uses the uri to save the media to device gallery
        await MediaLibrary.saveToLibraryAsync(localUri);

        if (localUri) {
          alert("Sreenshot Saved!");
        }

      } catch (error) {
        console.log("Error Taking Screenshot:", error);
        alert("Failed to save screenshot. Please try again.");
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current as unknown as HTMLElement, {
        quality: 0.95,
        width: 320,
        height: 440,
       });

      let link = document.createElement('a');
      link.download = 'sticker-smash.jpeg';
      link.href = dataUrl;
      link.click();
      } catch (e) {
         console.log(e);
      }
    }
  }
  

  return (
    <GestureHandlerRootView
      style={styles.container}
    >
      <View style={styles.imageContainer} >
        
        {/**reference of where to take to the screenshot */}
        <View ref={imageRef} collapsable={false}>
          {/**pass the placeholder image and selected image to ImageViewer, if selectedImage is defined it will be the one to be displayed */}
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />

          {/**renders the selected sticker from sticker list in sticker modal */}
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>}
        </View>
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

      {/**Emoji picker modal 
       * The onClose and onCloseModal prop executes a function that sets the modal visible to false hence it closes
      */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose} >

        {/**the onSelect prop executes the setPcikedEmoji */}
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
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