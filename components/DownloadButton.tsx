import * as MediaLibrary from "expo-media-library";
import React from "react";
import { Alert, Button } from "react-native";

interface DownloadButtonProps {
  imageUri: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUri }) => {
  const saveImageToGallery = async () => {
    try {
      const asset = await MediaLibrary.createAssetAsync(imageUri);
      await MediaLibrary.createAlbumAsync("StoryFit Images", asset, false);
      Alert.alert("Saved!", "Your image has been saved to the gallery.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save image to gallery.");
    }
  };

  return <Button title="Download to Gallery" onPress={saveImageToGallery} />;
};

export default DownloadButton;
