import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { NestableDraggableFlatList, NestableScrollContainer } from 'react-native-draggable-flatlist';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/screens/home';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <SafeAreaView style={[backgroundStyle]}>
      <Home />
    </SafeAreaView>
  );
}


export default App;
