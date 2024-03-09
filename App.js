import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// First tab screen
function HomeScreen() {
  // Function to handle button press
  const handlePress = () => {
    alert('Button was pressed!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text>Welcome!</Text>
          {/* TouchableOpacity button added here */}
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Click Me!</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Second tab screen
function SecondScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the second tab</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="SecondTab" component={SecondScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6a51ae',
  },
  header: {
    height: 60,
    backgroundColor: '#8e4dff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10, // Adjust this value if necessary
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#8e4dff', // Button background color
    padding: 10,
    borderRadius: 20, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    width: 200, // Set the width of the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
