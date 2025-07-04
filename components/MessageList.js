import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import { FlatList } from 'react-native'; // Using FlatList for better performance

const MessageList = ({ messages }) => {
  const renderMessage = ({ item }) => {
    const isUserMessage = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage ? styles.userMessageContainer : styles.aiMessageContainer
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isUserMessage ? styles.userMessageBubble : styles.aiMessageBubble
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUserMessage ? styles.userMessageText : styles.aiMessageText
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item, index) => item.id || index.toString()} // Prefer unique ID if available
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      inverted // To keep the latest messages at the bottom and auto-scroll
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingVertical: 10,
  },
  messageContainer: {
    marginVertical: 5,
    flexDirection: 'row', // To align bubbles left or right
  },
  userMessageContainer: {
    justifyContent: 'flex-end', // User messages on the right
  },
  aiMessageContainer: {
    justifyContent: 'flex-start', // AI messages on the left
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    maxWidth: '80%', // Max width of a message bubble
  },
  userMessageBubble: {
    backgroundColor: '#007AFF', // Blue for user messages
    borderBottomRightRadius: 5, // Give a slightly different shape
  },
  aiMessageBubble: {
    backgroundColor: '#E5E5EA', // Light gray for AI messages
    borderBottomLeftRadius: 5, // Give a slightly different shape
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff', // White text for user messages
  },
  aiMessageText: {
    color: '#000', // Black text for AI messages
  },
});

export default MessageList;
