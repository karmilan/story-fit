import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button } from "react-native";

interface ImagePickerProps {
  onImagePicked: (uri: string) => void;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  onImagePicked,
}) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return <Button title="Pick Image" onPress={pickImage} />;
};

export default ImagePickerComponent;
