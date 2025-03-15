import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Pressable, Text } from "react-native";

interface ImagePickerComponentProps {
  onImagePicked: (uri: string) => void;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  onImagePicked,
}) => {
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Allow access to pick an image.");
      return;
    }

    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // Enables cropping
        aspect: [9, 16], // Set aspect ratio for stories (1080x1920)
        quality: 1,
      });

      if (!image.canceled && image.assets.length > 0) {
        onImagePicked(image.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Image selection failed.");
    }
  };

  return (
    <Pressable
      onPress={pickImage}
      className="bg-blue-600 py-3 px-6 rounded-lg mt-4"
    >
      <Text className="text-white text-lg font-semibold text-center">
        📸 Pick Image
      </Text>
    </Pressable>
  );
};

export default ImagePickerComponent;
