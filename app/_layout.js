import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";
// This layout is used to wrap all the pages in the app, providing a consistent structure and shared functionality (e.g., authentication state)
const Mainlayout = () => {
  const { isAuthenticated } = useAuth();
  const segment = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated and redirect to the appropriate page
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segment[0] === "(app)";
    if (isAuthenticated && !inApp) {
      // Redirect to the home page if authenticated and not already in the app
      router.replace("home");
    } else if (isAuthenticated === false) {
      // Redirect to the login page if not authenticated and trying to access the app
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function _layout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <Mainlayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
