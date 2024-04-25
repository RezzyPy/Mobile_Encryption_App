import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };

    axios.post("http://localhost:8000/register", user)
      .then((response) => {
        Alert.alert("Registration successful", "You have been registered Successfully");
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
      })
      .catch((error) => {
        Alert.alert("Registration Error", "An error occurred while registering");
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Register to Your Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Enter your name"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Enter Your Email"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Password"
          />
          <TextInput
            value={image}
            onChangeText={setImage}
            style={styles.input}
            placeholderTextColor="#888"
            placeholder="Image URL (optional)"
          />
          <Pressable onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <Pressable onPress={() => navigation.goBack()} style={styles.registerLink}>
            <Text style={styles.registerText}>Already have an account? Sign In</Text>
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

export default RegisterScreen;
