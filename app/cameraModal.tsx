import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { claimNumber } = params;

  const claim = {
    claimNumber: "03000000",
    primaryInsured: "John Doe",
    primaryPhone: "555-123-4567",
    address: "123 Main St, Springfield, USA",
    dateOfLoss: "10-01-2023",
    description: "Description of the claim goes here.",
    status: "Open",
    assignedAdjuster: "Jane Smith",
    claimAmount: "$1,000.00",
    claimType: "Auto",
    claimId: "1234567890",
    notes: [
      { title: " Initial Contact", content: "Contacted insured on 10-02-2023" },
      {
        title: " Inspection Scheduled",
        content: "Inspection scheduled for 10-05-2023",
      },
      { title: " Follow-up", content: "Follow-up call on 10-10-2023" },
    ],
  };

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
    
    // <View className="flex flex-1 p-2 bg-gray-300">
    //   <Text>Camera</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });