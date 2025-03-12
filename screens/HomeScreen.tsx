import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import DownloadButton from "../components/DownloadButton";
import ImagePickerComponent from "../components/ImagePicker";
import ImagePreview from "../components/ImagePreview";
import { resizeImage } from "../utils/imageUtils";

const HomeScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImagePicked = async (uri: string) => {
    try {
      const resizedImage = await resizeImage(uri, 1080, 1920); // Resize to fit a story format
      setImageUri(resizedImage.uri);
    } catch (error) {
      Alert.alert("Error", "Failed to resize image.");
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerComponent onImagePicked={handleImagePicked} />
      {imageUri && (
        <>
          <ImagePreview uri={imageUri} />
          {/* <ZoomableImage uri={imageUri} /> */}
          <DownloadButton imageUri={imageUri} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
