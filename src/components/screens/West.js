import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import TeamCard from '../common/TeamCard';

const West = ({data, navigation}) => {
  // if (data && data.league) {
  //   console.log('data.league.standard WEST: ', data.league.standard);
  // }

  const renderItem = ({item}) => (
    <TeamCard
      teamName={item.fullName}
      teamId={item.teamId}
      navigation={navigation}
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

export default West;
