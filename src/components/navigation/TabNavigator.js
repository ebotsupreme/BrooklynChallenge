import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';
import PlayerSelectionScreen from '../screens/PlayerSelectionScreen';
import TeamSelectionScreen from '../screens/TeamSelectionScreen';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        // headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // component={StackNavigator}
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
          // tabBarLabel: 'Player Selection',
          // tabBarIcon: ({color, size}) => (
          //   <MaterialCommunityIcons
          //     name="account-multiple"
          //     color={color}
          //     size={size}
          //   />
          //   // <></>
          // ),
          // tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Team Selection"
        component={TeamSelectionScreen}
        options={{
          tabBarItemStyle: {display: 'none'},
          // tabBarLabel: 'Team Selection',
          // tabBarIcon: ({color, size}) => (
          //   <MaterialCommunityIcons
          //     name="account-group"
          //     color={color}
          //     size={size}
          //   />
          //   // <></>
          // ),
          // tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Edit Team"
        component={EditScreen}
        options={{
          tabBarItemStyle: {display: 'none'},
          // tabBarLabel: 'Edit Team',
          // tabBarIcon: ({color, size}) => (
          //   <MaterialCommunityIcons name="account" color={color} size={size} />
          //   // <></>
          // ),
          // tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
