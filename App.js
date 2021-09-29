import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './src/components/navigation/TabNavigator';
import {Provider} from 'react-redux';
import {store} from './src/app/store';

// import HomeScreen from './src/components/screens/HomeScreen';
// import EditScreen from './src/components/screens/EditScreen';
// import PlayerSelectionScreen from './src/components/screens/PlayerSelectionScreen';
// import TeamSelectionScreen from './src/components/screens/TeamSelectionScreen';

// const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
