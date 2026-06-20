import { Image } from "expo-image";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { db } from "../firebaseConfig";
import { blurhash, formatDate, getRoomId } from "../util/common";

export default function ChatItem({ item, router, noBorder, currentUser }) {
  const [lastMessages, setLastMessages] = useState(undefined);

  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  useEffect(() => {
    const roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");

    // last message listener
    const qLast = query(messageRef, orderBy("createdAt", "desc"));
    const unsubLast = onSnapshot(qLast, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => doc.data());
      setLastMessages(allMessages[0] ? allMessages[0] : null);
    });

    return () => {
      unsubLast();
    };
  }, []);

  const renderTime = () => {
    if (lastMessages) {
      let date = lastMessages?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  };

  const renderLastMessage = () => {
    if (lastMessages) {
      if (currentUser?.userId == lastMessages?.userId)
        return "You: " + lastMessages?.text;
      return lastMessages?.text;
    } else {
      return "Say hi...";
    }
  };

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`flex-row justify-between items-center gap-3 mb-4 pb-2 ${
        noBorder ? "" : "border-b border-b-neutral-200"
      }`}
    >
      <Image
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        source={item?.profileUrl}
        placeholder={blurhash}
        transition={500}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between items-center">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {renderTime()}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500 flex-1"
          >
            {renderLastMessage()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
