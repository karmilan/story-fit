import React from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <>
      <GestureHandlerRootView className="flex-1">
        <SafeAreaView className="flex-1">
          <HomeScreen />
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
}
