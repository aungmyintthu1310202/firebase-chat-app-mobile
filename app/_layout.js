import { Slot, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";

const Mainlayout = () => {
  const { isAuthenticated } = useAuth();
  const segment = useSegments();

  useEffect(() => {
    // Check if the user is authenticated and redirect to the appropriate page
  }, [isAuthenticated]);

  return <Slot />;
};

export default function _layout() {
  return (
    <AuthContextProvider>
      <Mainlayout />
    </AuthContextProvider>
  );
}
