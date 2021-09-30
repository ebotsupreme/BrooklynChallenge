import React from 'react';
import {View, Text} from 'react-native';

const West = ({data}) => {
  if (data && data.league) {
    console.log('data.league.standard WEST: ', data.league.standard);
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>West Screen</Text>
    </View>
  );
};

export default West;
