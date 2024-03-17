import React from 'react';
import { View, Text } from 'react-native';

const ChatScreen = ({ route }) => {
  const { friend } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat with {friend}</Text>
    </View>
  );
};

export default ChatScreen;

