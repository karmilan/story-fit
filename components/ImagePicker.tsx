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
        allowsEditing: true,
        aspect: [9, 16], // Instagram Story Ratio
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
      className="bg-blue-500 px-5 py-3 rounded-xl mt-4 shadow-lg active:bg-blue-700"
    >
      <Text className="text-white text-lg font-semibold text-center">
        📸 Pick Image
      </Text>
    </Pressable>
  );
};

export default ImagePickerComponent;
