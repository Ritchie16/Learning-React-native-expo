import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet } from "react-native";
import React from "react";

type Props = {
    imageSource: ImageSourcePropType;
}

export default function ImageViewer({imageSource}: Props){
    return(
        <Image source={imageSource} style={styles.image} />
    );
}

const styles = StyleSheet.create({
    image : {
        width: 320,
        height: 440,
        borderRadius: 18,
    }
});