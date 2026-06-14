import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function CustomKeyboardView({ children }) {
  const ios = Platform.OS == "ios";
  return (
    <View>
      <KeyboardAvoidingView behavior={ios ? "padding" : "height"}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
