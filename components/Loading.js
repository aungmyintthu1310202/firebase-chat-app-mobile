import LottieView from "lottie-react-native";
import { View } from "react-native";

export default function Loading({ size }) {
  return (
    <View style={{ height: size }}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../assets/images/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}
