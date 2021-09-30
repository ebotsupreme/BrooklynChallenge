import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import TeamCard from '../common/TeamCard';
import {Card} from 'react-native-paper';

const East = ({data}) => {
  if (data && data.league) {
    console.log('data.league.standard EAST: ', data.league.standard);
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {data &&
          data.map(team => (
            <TeamCard
              key={team.teamId}
              teamName={team.fullName}
              teamId={team.teamId}
            />
          ))}
      </ScrollView>
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
