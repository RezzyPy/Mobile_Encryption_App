
import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';

const FriendsListScreen = ({ navigation }) => {
  const [friends, setFriends] = useState(['Friend 1', 'Friend 2', 'Friend 3']);

  const addFriend = () => {
    setFriends([...friends, `Friend ${friends.length + 1}`]);
  };

  const removeFriend = () => {
    if (friends.length > 0) {
      const newFriendsList = friends.slice(0, friends.length - 1);
      setFriends(newFriendsList);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { friend: item })}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Add Friend" onPress={addFriend} />
      <Button title="Remove Friend" onPress={removeFriend} />
    </View>
  );
};

export default FriendsListScreen;
