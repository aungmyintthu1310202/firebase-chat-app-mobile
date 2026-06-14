import { Feather, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomKeyboardView from "../components/CustomKeyboardView";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Sign Up", "Please fill the all fields!");
      return;
    }
    // Register Process
    setLoading(true);
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current,
    );
    setLoading(false);
    console.log("got result:", response);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        {/* SignUp Image */}
        <View className="items-center">
          <Image
            style={{
              height: hp(23),
              width: wp(60),
            }}
            resizeMethod="contain"
            source={require("../assets/images/register.jpg")}
          />
        </View>

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign Up
          </Text>

          {/* Input Fields */}
          <View className="gap-4">
            {/* Username */}
            <View
              style={{ height: hp(7) }}
              className="flex-row items-center gap-4 px-4 rounded-xl bg-neutral-100"
            >
              <Feather name="user" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 text-neutral-700 font-semibold"
                placeholder="Username"
                placeholderTextColor={"gray"}
              />
            </View>

            {/* Email */}
            <View
              style={{ height: hp(7) }}
              className="flex-row items-center gap-4 px-4 rounded-xl bg-neutral-100"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 text-neutral-700 font-semibold"
                placeholder="Email address"
                placeholderTextColor={"gray"}
              />
            </View>

            {/* Password */}
            <View
              style={{ height: hp(7) }}
              className="flex-row items-center gap-4 px-4 rounded-xl bg-neutral-100"
            >
              <Octicons name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 text-neutral-700 font-semibold"
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={"gray"}
              />
            </View>

            {/* Profile URL */}
            <View
              style={{ height: hp(7) }}
              className="flex-row items-center gap-4 px-4 rounded-xl bg-neutral-100"
            >
              <Feather name="image" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 text-neutral-700 font-semibold"
                placeholder="Profile url"
                placeholderTextColor={"gray"}
              />
            </View>

            {/* Submit Button */}
            <View>
              {loading ? (
                <View className="flex-2 justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRegister}
                  style={{ height: hp(6.5) }}
                  className="bg-indigo-500 rounded-xl justify-center items-center"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="font-bold text-white tracking-wider"
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Sign In Text */}
            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("signIn")}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
