import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';

const Logo = ({props}) => {
  console.log('props ', props);
  return (
    <View
      style={
        props === 'Team Selection' || props === 'Player Selection'
          ? styles.updateBasketBallContainer
          : styles.basketBallContainer
      }>
      <IconButton
        icon="basketball-hoop-outline"
        color={Colors.red500}
        size={35}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  basketBallContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? -25 : -25,
    left: Platform.OS === 'ios' ? -135 : -135,
    // bottom: 10,
    alignItems: 'center',
    width: 50,
    backgroundColor: 'grey',
  },
  updateBasketBallContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? -25 : -25,
    left: Platform.OS === 'ios' ? -115 : -115,
    // bottom: 10,
    alignItems: 'center',
    width: 50,
    backgroundColor: 'grey',
  },
});

export default Logo;
