import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios.post("http://192.168.1.111:8082/login", user)
      .then((response) => {
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Home");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid email or password");
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>Sign In to Your Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Enter Your Email"
          />
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Password"
          />
          <Pressable onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Register")} style={styles.registerLink}>
            <Text style={styles.registerText}>Don't have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: 40,
  },
  title: {
    color: "#364f6b",
    fontSize: 22,
    fontWeight: "600",
  },
  subtitle: {
    color: "#3d5a80",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 5,
  },
  inputContainer: {
    width: '90%',
    maxWidth: 340,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#364f6b",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3d5a80",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  registerLink: {
    marginTop: 15,
  },
  registerText: {
    textAlign: "center",
    color: "#364f6b",
    fontSize: 16,
  },
});

export default LoginScreen;
