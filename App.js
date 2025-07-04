import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Custom Hexagon with Sparkle Component
const AiLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.hexagon}>
        <View style={styles.hexagonInner} />
        <View style={styles.hexagonBefore} />
        <View style={styles.hexagonAfter} />
        <MaterialCommunityIcons name="sparkles" size={40} color="#007AFF" style={styles.sparkle} />
      </View>
    </View>
  );
};

const App = () => {
  const [time, setTime] = React.useState('');

  React.useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topLeftIcons}>
          <Ionicons name="menu" size={28} color="white" />
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <View style={styles.topRightIcons}>
          <Ionicons name="signal" size={20} color="white" style={styles.iconSpacing} />
          <Ionicons name="battery-full" size={20} color="white" />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <AiLogo />
        <Text style={styles.tagline}>Enhance your productivity with AI</Text>
      </View>

      {/* Bottom Input Bar */}
      <View style={styles.bottomBar}>
        <TextInput
          style={styles.input}
          placeholder="How can I help?"
          placeholderTextColor="#8E8E93"
        />
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="search" size={20} color="#007AFF" />
          <Text style={styles.actionButtonText}>Research</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="clipboard-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="globe-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mic-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10, // Adjusted for SafeAreaView
    paddingBottom: 10,
    width: '100%',
  },
  topLeftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  topRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 8,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexagon: {
    width: 100,
    height: 110, // Adjusted height for a more regular hexagon
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of sparkle
  },
  hexagonInner: { // This creates the main hexagon shape
    width: 100,
    height: 57.73, // height = width * sqrt(3)/2 for inner part, but we use borders
    backgroundColor: '#000', // Center color
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#007AFF',
  },
  hexagonBefore: { // This creates the top and bottom triangles
    position: 'absolute',
    top: -28.86, // -(height / 2)
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 28.86, // height / 2
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#007AFF',
    transform: [{ rotate: '0deg'}] // Ensures correct orientation
  },
  hexagonAfter: { // This creates the bottom part of the hexagon
    position: 'absolute',
    bottom: -28.86, // -(height / 2)
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderTopWidth: 28.86, // height / 2
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#007AFF',
    transform: [{ rotate: '0deg'}] // Ensures correct orientation
  },
  sparkle: {
    position: 'absolute', // Position sparkle inside the hexagon
  },
  tagline: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10, // Added some margin from the logo
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#222', // Slightly lighter border for dark theme
    backgroundColor: '#1C1C1E', // Darker shade for the input bar
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#2C2C2E', // Dark input background
    borderRadius: 20,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 8,
    marginLeft: 5, // Add some spacing between icon buttons
  },
});

export default App;
