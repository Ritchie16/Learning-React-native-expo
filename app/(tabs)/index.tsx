import Button from '@/components/Button';
import ImageViewer from "@/components/ImageViewer";
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import { StyleSheet, View } from "react-native";


const PlaceholderImage = require('@/assets/images/background-image.png');


export default function Index() {
  const pickImageAsync = async () => {
    // No permissions request is necessary for launching the image library
    //the function launchImageLibraryAsync opens the image gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], //only images
      allowsEditing: true, //allow user to edit the image
      quality: 1, //highest quality and other quality values are 0 to 1
    });

    //if the user did not cancel the process
    if(!result.canceled){
      console.log(result);
    }
    else {
      alert('You did not select any image.');
    }
  }
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer} >
       <ImageViewer imageSource={PlaceholderImage} />
      </View>
      
      <View style={styles.footerContainer} >
        {/**passing the props including a prop to select an image to Pressable */}
        <Button label="Choose a photo" theme='primary' onPress={pickImageAsync}/>
        <Button label="Use this photo" />
      </View>
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
});