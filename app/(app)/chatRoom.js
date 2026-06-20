import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import { getRoomId } from "../../util/common";

export default function ChatRoom() {
  const item = useLocalSearchParams(); // recipient
  const { user } = useAuth(); // logged-in user
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef(null);

  const textRef = useRef("");
  const inputRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();

    const roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messageRef = collection(docRef, "messages");
    const q = query(messageRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(allMessages);
    });

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView,
    );

    return () => {
      unsub();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const createRoomIfNotExists = async () => {
    const roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(
      doc(db, "rooms", roomId),
      {
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
      },
      { merge: true },
    );
  };

  // ─── Send message ───
  const handleSendMessage = async () => {
    const message = textRef.current.trim();
    if (!message) return;

    try {
      const roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");

      textRef.current = "";
      inputRef?.current?.clear();

      await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 75}
    >
      <View className="flex-1 bg-white">
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 bg-neutral-100">
          <MessageList
            scrollViewRef={scrollViewRef}
            messages={messages}
            currentUser={user}
          />
        </View>
        <View
          style={{ paddingBottom: hp(2.7) }}
          className="pt-2 bg-neutral-100"
        >
          <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
            <TextInput
              ref={inputRef}
              onChangeText={(value) => (textRef.current = value)}
              placeholder="Type message..."
              className="flex-1 mr-2"
              style={{ fontSize: hp(2) }}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              className="bg-neutral-200 p-2 mr-[1px] rounded-full"
            >
              <MaterialCommunityIcons
                name="send-circle"
                size={hp(3.5)}
                color="#737373"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
