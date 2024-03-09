import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Le app</Text>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonContainer, styles.signupButtonContainer]}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  signupButtonContainer: {
    backgroundColor: '#28a745', // Different color for sign up button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
