import { ActivityIndicator, View } from "react-native";

export default function StartPage() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="grey" />
    </View>
  );
}
