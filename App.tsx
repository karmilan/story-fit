import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React, { useRef, useState } from "react";
import { Alert, View } from "react-native";
import ViewShot from "react-native-view-shot";
import "./global.css";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const viewShotRef = useRef<ViewShot>(null);

  // Request permissions for media library
  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need gallery permissions to save images."
      );
    }
  };

  // Pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      resizeImage(result.assets[0].uri);
    }
  };

  // Resize the image to fit 1080x1920
  const resizeImage = async (uri: string) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1080, height: 1920 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );

    setImage(resizedImage.uri);
  };

  // Save image to gallery
  const saveImageToGallery = async () => {
    if (!image) return;

    try {
      // Save the image to the media library (gallery)
      const asset = await MediaLibrary.createAssetAsync(image);
      await MediaLibrary.createAlbumAsync("StoryFit Images", asset, false);

      Alert.alert("Saved!", "Your image has been saved to the gallery.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save image to gallery.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center mb-20">
      <HomeScreen />
      {/* <Button title="Pick Image" onPress={pickImage} />
      {image && (
        <>
          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 533, marginVertical: 20 }}
              resizeMode="contain"
            />
          </ViewShot>
          <Button title="Download to Gallery" onPress={saveImageToGallery} />
        </>
      )} */}
    </View>
  );
}
