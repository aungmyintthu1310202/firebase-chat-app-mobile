import { Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function MessageItem({ messages, currentUser }) {
  if (currentUser?.userId == messages?.userId) {
    // my message or sender message
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end p-3 rounded-2xl bg-white border border-neutral-200">
            <Text style={{ fontSize: hp(1.9) }}>{messages?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View className="flex-row mb-3 ml-3">
        <View
          className="self-start p-3 rounded-2xl bg-indigo-400 border border-neutral-200"
          style={{ maxWidth: wp(80) }}
        >
          <Text style={{ fontSize: hp(1.9) }}>{messages?.text}</Text>
        </View>
      </View>
    );
  }
}
