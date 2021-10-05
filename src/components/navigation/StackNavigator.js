import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';
import PlayerSelectionScreen from '../screens/PlayerSelectionScreen';
import TeamSelectionScreen from '../screens/TeamSelectionScreen';
import BottomTabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    // <NavigationContainer>
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
    // </NavigationContainer>
  );
};

export default StackNavigator;
