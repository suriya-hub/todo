import React from 'react';
import { SafeAreaView, useColorScheme, LogBox, StyleSheet } from 'react-native';
import Home from './src/screens/home';

LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode
    ? {
        background: '#121212', // Dark mode background
        text: '#ffffff',      // Light text for dark mode
        primary: '#BB86FC',   // Primary color for dark mode
        secondary: '#03DAC6', // Secondary color for dark mode
      }
    : {
        background: '#ffffff', // Light mode background
        text: '#000000',      // Dark text for light mode
        primary: '#6200EE',   // Primary color for light mode
        secondary: '#03A9F4', // Secondary color for light mode
      };

  const backgroundStyle = {
    backgroundColor: colors.background,
    flex: 1,
  };

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <Home colors={colors} />
    </SafeAreaView>
  );
}

export default App;
