import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import ChatItem from "./ChatItem";

export default function ChatList({ users, currentUser }) {
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{
          flex: 1,
          paddingVertical: 25,
          paddingHorizontal: 15,
        }}
        keyExtractor={(item) => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            noBorder={index + 1 == users.length}
            router={router}
            item={item}
            index={index}
            currentUser={currentUser}
          />
        )}
      />
    </View>
  );
}
