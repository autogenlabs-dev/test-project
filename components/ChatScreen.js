import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'ai' },
    // Example messages:
    // { id: '2', text: 'Hi there!', sender: 'user' },
    // { id: '3', text: 'I am a friendly AI assistant.', sender: 'ai' },
  ]);

  // API Integration Placeholder
  const callMyApi = async (messageText) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // This is where you would make your actual API call, e.g.:
    // try {
    //   const response = await fetch('YOUR_API_ENDPOINT', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_KEY' },
    //     body: JSON.stringify({ query: messageText })
    //   });
    //   const data = await response.json();
    //   return data.reply || "Sorry, I couldn't process that.";
    // } catch (error) {
    //   console.error("API Error:", error);
    //   return "Error connecting to the AI service.";
    // }

    // Mocked AI response
    return `You said: "${messageText}". I am a mock AI.`;
  };

  const handleSendMessage = useCallback(async (newMessageText) => {
    const userMessage = {
      id: Date.now().toString(), // Simple unique ID
      text: newMessageText,
      sender: 'user',
    };
    setMessages(prevMessages => [userMessage, ...prevMessages]); // Add new message to the top for FlatList inverted

    // Simulate AI response
    const aiResponseText = await callMyApi(newMessageText);
    const aiMessage = {
      id: (Date.now() + 1).toString(), // Simple unique ID for AI
      text: aiResponseText,
      sender: 'ai',
    };
    setMessages(prevMessages => [aiMessage, ...prevMessages]);
  }, []);

  return (
    <View style={styles.container}>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background for the chat area
  },
});

export default ChatScreen;
