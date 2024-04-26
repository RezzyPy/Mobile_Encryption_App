import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons"; // For the logout icon
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
import config from "../config"

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Users</Text>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={logout}>
          <AntDesign name="logout" size={24} color="black" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
          {/* Empty for no icons in the header right */}
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`http://${config.serverIP}/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Chats")}>
          <Ionicons name="chatbox-ellipses-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Friend Requests")}>
          <MaterialIcons name="people-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.userList}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 10
  },
  iconButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0' // Light grey background for the icon buttons
  },
  userList: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10
  }
});

export default HomeScreen;
