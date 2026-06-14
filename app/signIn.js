import { Octicons } from "@expo/vector-icons";
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

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill the all fields!");
      return;
    }
    // Login Process
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    console.log("sign in response:", response);
    if (!response.success) {
      Alert.alert("Sign In", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View className="flex-1">
        <View
          style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
          className="flex-1 gap-12"
        >
          {/* SignIn Image */}
          <View className="items-center">
            <Image
              style={{
                height: hp(25),
                width: wp(70),
              }}
              resizeMethod="contain"
              source={require("../assets/images/login.png")}
            />
          </View>

          <View className="gap-10">
            <Text
              style={{ fontSize: hp(4) }}
              className="font-bold tracking-wider text-center text-neutral-800"
            >
              Sign In
            </Text>

            {/* Input Fields */}
            <View className="gap-4">
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
              <View className="gap-4">
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
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-semibold text-right text-neutral-500"
                >
                  Forgot Password?
                </Text>
              </View>

              {/* Submit Button */}
              <View>
                {loading ? (
                  <View className="flex-2 justify-center">
                    <Loading size={hp(6.5)} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleLogin}
                    style={{ height: hp(6.5) }}
                    className="bg-indigo-500 rounded-xl justify-center items-center"
                  >
                    <Text
                      style={{ fontSize: hp(2.7) }}
                      className="font-bold text-white tracking-wider"
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Sign up Text */}
              <View className="flex-row justify-center">
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-semibold text-neutral-500"
                >
                  Don’t have an account?{" "}
                </Text>
                <Pressable onPress={() => router.push("signUp")}>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-bold text-indigo-500"
                  >
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
