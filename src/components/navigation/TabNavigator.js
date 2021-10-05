import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';
import PlayerSelectionScreen from '../screens/PlayerSelectionScreen';
import TeamSelectionScreen from '../screens/TeamSelectionScreen';
// import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Player Selection"
        component={PlayerSelectionScreen}
        options={{
          tabBarItemStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="Team Selection"
        component={TeamSelectionScreen}
        options={{
          tabBarItemStyle: {display: 'none'},
        }}
      />
      <Tab.Screen
        name="Edit Team"
        component={EditScreen}
        options={{
          tabBarItemStyle: {display: 'none'},
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
