import React from 'react';
import {View, Text} from 'react-native';

const EditScreen = ({route, navigation}) => {
  const {selectedPlayerName, selectedPlayerId, selectedPlayerImage} =
    route.params;

  console.log(
    'Edit Screen: ',
    selectedPlayerName,
    ' ',
    selectedPlayerId,
    ' ',
    selectedPlayerImage,
  );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Edit Team Screen</Text>
      <Text>
        {selectedPlayerName} {selectedPlayerId} {selectedPlayerImage}
      </Text>
    </View>
  );
};

export default EditScreen;
