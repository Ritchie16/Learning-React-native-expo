import Button from '@/components/Button';
import ImageViewer from "@/components/ImageViewer";
import React from "react";
import { StyleSheet, View } from "react-native";


const PlaceholderImage = require('@/assets/images/background-image.png');


export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.imageContainer} >
       <ImageViewer imageSource={PlaceholderImage} />
      </View>
      
      <View style={styles.footerContainer} >
        <Button label="Choose a photo" theme='primary' />
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