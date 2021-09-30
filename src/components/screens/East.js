import React from 'react';
import {View, Text} from 'react-native';

const East = ({data}) => {
  if (data && data.league) {
    console.log('data.league.standard EAST: ', data.league.standard);
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>East Screen</Text>
    </View>
  );
};

export default East;
