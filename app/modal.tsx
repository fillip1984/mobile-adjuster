import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Modal() {
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

  return (
    <View className="flex flex-1 p-2 bg-gray-300">
      <View className="flex flex-1">
        <View className="flex flex-1 gap-2">
          <View className="mb-4">
            <Text className="text-xl text-black/50">Details</Text>
            <Text className="text-xl">Claim #: {claim.claimNumber}</Text>
            <Text className="text-xl">DOL: {claim.dateOfLoss}</Text>
            <Text>Cat: Yes</Text>
          </View>
          <Pressable className="border rounded-lg border-black p-2">
            <Text className="text-xl text-black/50">Main Contact</Text>
            <Text className="text-xl">{claim.primaryInsured}</Text>
            <Text>{claim.primaryPhone}</Text>
            <Text>Rel: Primary Insured</Text>
          </Pressable>

          <Pressable className="border rounded-lg border-black p-2">
            <Text className="text-xl text-black/50">Loss Location</Text>
            <Text>{claim.address}</Text>
          </Pressable>

          <Pressable className="border rounded-lg border-black p-2">
            <Text className="text-xl text-black/50">Notes</Text>
            {claim.notes.map((note, index) => (
              <View key={index} className="mb-2">
                <Text className="text-lg">{note.title}</Text>
                <Text className="text-sm text-gray-600">{note.content}</Text>
              </View>
            ))}
          </Pressable>

          <View className="border rounded-lg border-black p-2 overflow-hidden">
            <Text className="text-xl text-black/50">Photos/Documents</Text>
            <View className="flex flex-row gap-2 overflow-auto">
              <Image
                style={{ width: 100, height: 100 }}
                source={require("@/assets/test/home-damage-page.png")}
              />
              <Image
                style={{ width: 100, height: 100 }}
                source={require("@/assets/test/IMG-20230222-WA0018.jpg")}
              />
              <Image
                style={{ width: 100, height: 100 }}
                source={require("@/assets/test/IMG-20230305-WA0015.jpg")}
              />
              <Image
                style={{ width: 100, height: 100 }}
                source={require("@/assets/test/home-damage-page.png")}
              />
            </View>
          </View>
        </View>

        <View className="border rounded-lg border-black p-2 m-4">
          <Text className="text-xl text-black/50">Actions</Text>
          <View className="flex flex-row gap-2 items-center justify-center">
            <Pressable
              className="bg-blue-500 p-2 rounded-lg flex items-center justify-center"
              onPress={() => {
                // Handle action here
              }}>
              <FontAwesome6 name="note-sticky" size={24} color="white" />
              <Text className="text-white text-sm">Add Note</Text>
            </Pressable>
            <Pressable
              className="bg-blue-500 p-2 rounded-lg flex items-center justify-center"
              onPress={() => {
                // Handle action here
              }}>
              <MaterialIcons name="checklist" size={24} color="white" />
              <Text className="text-white text-sm">Add Activity</Text>
            </Pressable>
            <Pressable
              className="bg-blue-500 p-2 rounded-lg flex items-center justify-center"
              onPress={() => {
                // Handle action here
              }}>
              <FontAwesome6 name="camera-retro" size={24} color="white" />
              <Text className="text-white text-sm">Add Photo</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
