import React, { useState } from "react";
import { Text, View } from "react-native";
import ImagePickerComponent from "../components/ImagePicker";
import ImagePreview from "../components/ImagePreview";

const HomeScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-5">
      <Text className="text-white text-2xl font-bold mb-5 text-center">
        📱 StoryFit - Resize & Download
      </Text>

      <ImagePickerComponent onImagePicked={setImageUri} />

      {imageUri && <ImagePreview uri={imageUri} />}
    </View>
  );
};

export default HomeScreen;
