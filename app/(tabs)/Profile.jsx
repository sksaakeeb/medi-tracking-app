import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "expo-router";

const Profile = () => {
  const route = useRouter();
  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("User signed out successfully");
      // Navigate to login screen if needed
      route.replace("login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Log Out Here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
