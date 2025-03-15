import * as MediaLibrary from "expo-media-library";
import React, { useRef } from "react";
import { Alert, Button, StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import ViewShot from "react-native-view-shot";

interface ImagePreviewProps {
  uri: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ uri }) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const viewShotRef = useRef<ViewShot>(null);

  // Pinch to Zoom Gesture
  const pinchGesture = Gesture.Pinch().onChange((event) => {
    scale.value = withSpring(event.scale);
  });

  // Pan Gesture
  const panGesture = Gesture.Pan().onChange((event) => {
    translateX.value = event.translationX;
    translateY.value = event.translationY;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Capture & Save Cropped Image
  const saveImage = async () => {
    if (viewShotRef.current) {
      try {
        const uri = await viewShotRef.current.capture();
        const permission = await MediaLibrary.requestPermissionsAsync();

        if (!permission.granted) {
          Alert.alert("Permission Required", "Allow access to save images.");
          return;
        }

        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("StoryFit Images", asset, false);
        Alert.alert("Success", "Image saved to gallery!");
      } catch (error) {
        Alert.alert("Error", "Failed to save image.");
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
        <GestureDetector
          gesture={Gesture.Simultaneous(pinchGesture, panGesture)}
        >
          <Animated.Image
            source={{ uri }}
            style={[styles.image, animatedStyle]}
            resizeMode="contain"
          />
        </GestureDetector>
      </ViewShot>
      <Button title="Save Image" onPress={saveImage} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 533,
  },
});

export default ImagePreview;
