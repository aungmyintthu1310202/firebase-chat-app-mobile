import { Pressable, Text, View } from "react-native";
import { useAuth } from "../../context/authContext";

export default function Home() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View>
      <Text>Home Page</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
}
