import * as Location from "expo-location";
import { AppleMaps, GoogleMaps } from "expo-maps";
import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
import { useEffect, useState } from "react";
import { Platform, Text } from "react-native";

export default function HomeScreen() {
  // return (
  // <View className="flex-1 items-center justify-center bg-white">
  //   <Text className="text-xl font-bold text-blue-500">A map</Text>
  // </View>
  // )
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View
        uiSettings={{ myLocationButtonEnabled: true }}
        cameraPosition={{ coordinates: location?.coords, zoom: 10 }}
        properties={{
          mapType: AppleMapsMapType.HYBRID,
          selectionEnabled: true,
          isMyLocationEnabled: true,
          isTrafficEnabled: true,
        }}
        style={{ flex: 1 }}
      />
    );
  } else if (Platform.OS === "android") {
    return <GoogleMaps.View style={{ flex: 1 }} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}
