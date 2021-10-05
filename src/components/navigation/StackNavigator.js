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
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Stack.Screen name="Add Team" component={HomeScreen} />
      <Stack.Screen name="Edit Team" component={EditScreen} />
      <Stack.Screen name="Player Selection" component={PlayerSelectionScreen} />
      <Stack.Screen name="Team Selection" component={TeamSelectionScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
