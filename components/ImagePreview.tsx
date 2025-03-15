import * as MediaLibrary from "expo-media-library";
import React, { useRef } from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";
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

  // Zoom Gesture
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

  // Save Image
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
        Alert.alert("✅ Success", "Image saved to gallery!");
      } catch (error) {
        Alert.alert("❌ Error", "Failed to save image.");
      }
    }
  };

  return (
    <GestureHandlerRootView className="flex items-center justify-center mt-5">
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

      {/* Save Button */}
      <Pressable
        onPress={saveImage}
        className="bg-green-600 px-5 py-3 rounded-xl mt-4 shadow-lg active:bg-green-700"
      >
        <Text className="text-white text-lg font-semibold text-center">
          💾 Save to Gallery
        </Text>
      </Pressable>
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
