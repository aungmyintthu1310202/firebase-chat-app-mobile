import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
export default function ChatRoom() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  return (
    <View className="flex-1 bg-white">
      <ChatRoomHeader user={item} router={router} />
      <View className="h-3 border-b border-neutral-300" />
      {/* message list */}
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList messages={messages} />
        </View>
      </View>
      {/* message input */}
      <View style={{ marginBottom: hp(2.7) }} className="pt-2 bg-neutral-100">
        <View className="flex-row justify-between items-center mx-3">
          <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
            <TextInput
              placeholder="Type message..."
              className="flex-1 mr-2"
              style={{ fontSize: hp(2) }}
            />
            <TouchableOpacity className="bg-neutral-200 p-2 mr-[1px] rounded-full">
              <MaterialCommunityIcons
                name="send-circle"
                size={hp(3.5)}
                color="#737373"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
