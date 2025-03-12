import * as ImageManipulator from "expo-image-manipulator";

// Function to resize an image
export const resizeImage = async (
  uri: string,
  width: number,
  height: number
) => {
  return await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width, height } }],
    {
      compress: 1,
      format: ImageManipulator.SaveFormat.PNG,
    }
  );
};
