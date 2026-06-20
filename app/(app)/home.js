import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatList from "../../components/ChatList";
import { useAuth } from "../../context/authContext";
import { usersRef } from "../../firebaseConfig";

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  });

  // Fetch user from firebase
  const getUsers = async () => {
    // not include login user data
    const q = query(usersRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  };

  return (
    <View className="flex-1 bg-white">
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex justify-center" style={{ paddingTop: hp(40) }}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      )}
    </View>
  );
}
