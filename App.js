import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Dummy data for messages
const messages = [
  { id: '1', username: 'Bob', message: 'Hello, how are you?' },
  { id: '2', username: 'Alice', message: 'Are you coming today?' },
  // Add more messages as needed
];

// ActionButton component for the plus and minus circles
const ActionButton = ({ icon, onPress, color }) => (
  <TouchableOpacity onPress={onPress} style={[styles.actionButton, { backgroundColor: color }]}>
    <Text style={styles.actionButtonText}>{icon}</Text>
  </TouchableOpacity>
);

// Message List Screen
function MessageListScreen({ navigation }) {
  // Placeholder functions for adding and deleting friends
  const handleAddFriend = () => alert('Add friend functionality.');
  const handleDeleteFriend = () => alert('Delete friend functionality.');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerButtons}>
        <ActionButton icon="−" onPress={handleDeleteFriend} color="#f44336" /> 
        <ActionButton icon="+" onPress={handleAddFriend} color="#4CAF50" /> 
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageItem}
            onPress={() => navigation.navigate('Message', { message: item.message, username: item.username })}>
            <Text style={styles.username}>{item.username}</Text>
            <Text>{item.message}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// Individual Message Screen
function MessageScreen({ route, navigation }) {
  // Extract username from route parameters
  const { username, message } = route.params;

  // Set navigation header title to username
  React.useEffect(() => {
    navigation.setOptions({ title: username });
  }, [navigation, username]);

  return (
    <View style={styles.container}>
      <View style={styles.friendBubble}>
        <Text>{message}</Text>
      </View>
      <View style={styles.userBubble}>
        <Text style={styles.userBubbleText}>Response  to {username}</Text>
      </View>
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Messages" component={MessageListScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Ensures the background color is consistent
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff', // Matches the container background
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Adds a subtle separator
  },
  messageItem: {
    padding: 20, // Increased padding for better tap target and spacing
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Lighter color for a softer look
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5, // Adds space between the username and the message
  },
  friendBubble: {
    padding: 15,
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10 // Added to give space from the top
  },
  userBubble: {
    padding: 15,
    backgroundColor: '#007aff',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginTop: 10,
    marginRight: 10// Space between friend bubble and user bubble
  },
  userBubbleText: {
    color: '#fff',
  },
  actionButton: {
    width: 60, // Slightly larger for easier tapping
    height: 60,
    borderRadius: 30, // Fully rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Adds space between buttons
  },
  actionButtonText: {
    fontSize: 30, // Larger icon text for clarity
    color: '#fff',
  },
});

export default App;
