import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import TeamCard from '../common/TeamCard';

const East = ({data, customTeamId, customTeamKey, navigation}) => {
  const renderItem = ({item}) => (
    <TeamCard
      teamName={item.fullName}
      teamId={item.teamId}
      navigation={navigation}
      customTeamId={customTeamId}
      customTeamKey={customTeamKey}
    />
  );

  return (
    <View style={styles.container}>
      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.teamId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default East;
