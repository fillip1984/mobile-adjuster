import * as Location from "expo-location";
import { AppleMaps } from "expo-maps";
import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const claims = [
    {
      id: "03000000",
      title: "Claim 03000000",
      description: "Description for Claim 1",
      coordinates: {
        latitude: 38.17846468491433,
        longitude: -85.61971154763148,
      },
    },
    {
      id: "03000002",
      title: "Claim 03000002",
      description: "Description for Claim 2",
      coordinates: { latitude: 37.78825, longitude: -85.4325 },
    },
  ];

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
      <SafeAreaView className="flex flex-1">
        <AppleMaps.View
          cameraPosition={{ coordinates: location?.coords, zoom: 10 }}
          uiSettings={{ myLocationButtonEnabled: true }}
          properties={{
            mapType: AppleMapsMapType.STANDARD,
            selectionEnabled: true,
            isMyLocationEnabled: true,
            isTrafficEnabled: true,
          }}
          style={{ flex: 1 }}
          markers={claims}
          onMarkerClick={(marker) => {
            console.log("Marker clicked", marker);
            const clickedClaim = claims.find((claim) => claim.id === marker.id);
            if (clickedClaim) {
              console.log("Clicked claim:", clickedClaim);
              router.push({
                pathname: "/modal",
                params: { claimNumber: clickedClaim.title },
              });
            }
          }}
          onMapClick={(event) => {
            console.log("Map clicked at:", { event });
          }}
        />
      </SafeAreaView>
    );
    // } else if (Platform.OS === "android") {
    //   return <GoogleMaps.View style={{ flex: 1 }} />;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}
