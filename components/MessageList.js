import { ScrollView } from "react-native";
import MessageItem from "./MessageItem";

export default function MessageList({ messages, scrollViewRef, currentUser }) {
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((msg, index) => (
        <MessageItem messages={msg} key={index} currentUser={currentUser} />
      ))}
    </ScrollView>
  );
}
