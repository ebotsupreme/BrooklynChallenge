import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';
import PlayerSelectionScreen from '../screens/PlayerSelectionScreen';
import TeamSelectionScreen from '../screens/TeamSelectionScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen
          name="Player Selection"
          component={PlayerSelectionScreen}
        />
        <Stack.Screen name="Team Selection" component={TeamSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
