import React from "react";
import { Image, StyleSheet } from "react-native";

interface ImagePreviewProps {
  uri: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ uri }) => {
  return <Image source={{ uri }} style={styles.image} resizeMode="contain" />;
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 533,
    marginVertical: 20,
  },
});

export default ImagePreview;
