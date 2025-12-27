import { ImageSourcePropType, View } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';


type Props = {
    imageSize: number;
    stickerSource: ImageSourcePropType;
}
//displays the sticker that was selected, it receivs the sticker size and source props
export default function EmojiSticker({imageSize, stickerSource}: Props){
    return(
        <View style={{top: -350}}>
            {/**uses same size for width and height */}
            <Image source={stickerSource} style={{width: imageSize, height: imageSize}}/>
        </View>
    )
}