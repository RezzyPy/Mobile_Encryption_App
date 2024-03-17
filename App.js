import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// Dummy data for friends list
let friendsData = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Alice' },
  { id: 4, name: 'Bob' },
];

// Component for displaying individual friend item
const FriendItem = ({ id, name, onPress, onRemove }) => (
  <View style={styles.friendItem}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.friendName}>{name}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onRemove(id)}>
      <Text style={styles.removeButton}>Remove</Text>
    </TouchableOpacity>
  </View>
);


const FriendsListScreen = ({ navigation }) => {
  const [friends, setFriends] = useState(friendsData);
  const [newFriendName, setNewFriendName] = useState('');

  const handleAddFriend = () => {
    if (newFriendName.trim() !== '') {
      const newFriend = { id: friends.length + 1, name: newFriendName };
      setFriends([...friends, newFriend]);
      setNewFriendName('');
    }
  };

  const handleRemoveFriend = (friendId) => {
    const updatedFriends = friends.filter((friend) => friend.id !== friendId);
    setFriends(updatedFriends);
  };

  const handleFriendPress = (friend) => {
    navigation.navigate('Chat', { friend });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {friends.map((friend) => (
          <FriendItem
            key={friend.id}
            id={friend.id}
            name={friend.name}
            onPress={() => handleFriendPress(friend)}
            onRemove={handleRemoveFriend}
          />
        ))}
      </ScrollView>
      <View style={styles.addRemoveContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter friend's name"
          value={newFriendName}
          onChangeText={(text) => setNewFriendName(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


// Component for the chat screen
const ChatScreen = ({ route }) => {
  const { friend } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { sender: 'You', message }]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chatHeader}>Chat with {friend.name}</Text>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.message}>
            <Text style={styles.sender}>{msg.sender}:</Text>
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleMessageSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles for FriendsListScreen
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  friendItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row', // Align items in row
    justifyContent: 'space-between', // Add space between friend name and remove button
    alignItems: 'center', // Align items vertically in the center
  },
  friendName: {
    fontSize: 18,
  },
  removeButton: {
    color: 'red',
  },
  addRemoveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  
  // Styles for ChatScreen
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  message: {
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FriendsList">
        <Stack.Screen name="FriendsList" component={FriendsListScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
