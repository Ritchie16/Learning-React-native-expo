import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


type Props = {
    imageSize: number;
    stickerSource: ImageSourcePropType;
}
//displays the sticker that was selected, it receivs the sticker size and source props
export default function EmojiSticker({imageSize, stickerSource}: Props){
    //a mutable value
    const scaleImage = useSharedValue(imageSize);

    //Gesture.Tap() is a config object no detection yet
    const doubleTab = Gesture.Tap()
    .numberOfTaps(2)    //only execute when two quick taps detected
    .onStart(() => {
        //if initial value is not equal to it's double though it was double tapped, then it should be doubled
        if (scaleImage.value !== imageSize * 2) {
            scaleImage.value = scaleImage.value * 2;
        }
        else {
            //if the value is already equal to it's double then divide it's value by 2
            //Math.round() To round a number to decimal value
            scaleImage.value = Math.round(scaleImage.value / 2);
        }
    })


    //the useAnimatedStyle notices changes  for scaleImage value and 
    const imageStyle = useAnimatedStyle(() => {
        return {
            //withSpring makes the emoji to grow and shrink smoothly 
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });


    return(
        <View style={{top: -350}}>
           <GestureDetector  gesture={doubleTab}>
              {/**uses same size for width and height
               * After useAnimatedStyles smoothly recalculated values, the Amimated.Image smoothly updates 
              */}
              <Animated.Image
                source={stickerSource}
                resizeMode="contain" //makes the image uniformly fits inside container without distortion
                
                //the styles for imageSize are initial and static. when animations run the imageStyle overrides
                style={[imageStyle, {width: imageSize, height: imageSize}]}
              />
           </GestureDetector>
        </View>
    )
}