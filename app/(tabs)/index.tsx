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
      
      
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },

});