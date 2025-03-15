import React, { useState } from "react";
import { Text, View } from "react-native";
import ImagePickerComponent from "../components/ImagePicker";
import ImagePreview from "../components/ImagePreview";

const HomeScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-md color-red-600">Home Screen</Text>
      <ImagePickerComponent onImagePicked={setImageUri} />
      {imageUri && <ImagePreview uri={imageUri} />}
    </View>
  );
};

export default HomeScreen;
