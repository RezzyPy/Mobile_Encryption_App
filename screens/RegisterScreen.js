import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../config';
import nacl from 'tweetnacl';
import { encode as base64Encode } from 'base-64';
import 'react-native-get-random-values';
import * as SecureStore from 'expo-secure-store';
import * as Random from 'expo-random';

// Set up nacl with a custom PRNG using expo-random
nacl.setPRNG((x, n) => {
  let randomBytes = Random.getRandomBytes(n);
  for (let i = 0; i < n; i++) {
    x[i] = randomBytes[i];
  }
});
//a

// Function to encode Uint8Array to Base64
const toBase64 = (uint8Array) => {
  return base64Encode(String.fromCharCode.apply(null, uint8Array));
};

// Function to securely store the private key
const savePrivateKeySecurely = async (key) => {
  await SecureStore.setItemAsync('privateKey', key);
};

// UseState hooks initialized as empty; updater functions change these values
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  // Function to generate key pair using tweetnacl
  const generateKeyPair = () => {
    return nacl.box.keyPair();
  };

  // Creates an object with all information
  const handleRegister = () => {
    const keyPair = generateKeyPair();
    const publicKey = toBase64(keyPair.publicKey);
    const privateKey = toBase64(keyPair.secretKey);  // Convert privateKey to Base64 for storage

    //SHOULD REMOVE LATER 
    console.log("Generated Private Key:", privateKey); // Log the private key for verification 
    //SHOULD REMOVE LATER ^

    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
      publicKey: publicKey  // Add public key to the user object
    };

    // Sends to backend to create user
    axios.post(`http://${config.serverIP}/register`, user)
      .then((response) => {
        Alert.alert("Registration successful", "You have been registered Successfully");
        setName('');
        setEmail('');
        setPassword('');
        setImage('');
        // Securely store the private key locally
        savePrivateKeySecurely(privateKey);
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
    backgroundColor: '#f4f4f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    color: '#364f6b',
    fontSize: 22,
    fontWeight: '600',
  },
  subtitle: {
    color: '#3d5a80',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 5,
  },
  inputContainer: {
    width: '90%',
    maxWidth: 340,
  },
  input: {
    fontSize: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3d5a80',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  registerLink: {
    marginTop: 15,
  },
  registerText: {
    textAlign: 'center',
    color: '#364f6b',
    fontSize: 16,
  },
});

export default RegisterScreen;
