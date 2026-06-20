import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

export default function CustomKeyboardView({ children, inChat }) {
  let kavConfig = {};
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 90 };
  }
  const ios = Platform.OS === "ios";
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      {...kavConfig}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
