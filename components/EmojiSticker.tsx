import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import Animated from 'react-native-reanimated';



type Props = {
    imageSize: number;
    stickerSource: ImageSourcePropType;
}
//displays the sticker that was selected, it receivs the sticker size and source props
export default function EmojiSticker({imageSize, stickerSource}: Props){
    return(
        <View style={{top: -350}}>
            {/**uses same size for width and height */}
            <Animated.Image
              source={stickerSource}
              resizeMode="contain"
              style={{width: imageSize, height: imageSize}}
            />
        </View>
    )
}