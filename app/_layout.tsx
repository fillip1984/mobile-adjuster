import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="claimModal" options={{ presentation: "modal" }} />
        <Stack.Screen name="cameraModal" options={{ presentation: "modal" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
