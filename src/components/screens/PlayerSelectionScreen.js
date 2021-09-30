import React from 'react';
import {View, Text} from 'react-native';

const PlayerSelectionScreen = ({route, navigation}) => {
  const {teamName} = route.params;

  console.log('player selection screen teamName', teamName);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Player Selection Screen</Text>
      <Text>{teamName}</Text>
    </View>
  );
};

export default PlayerSelectionScreen;
