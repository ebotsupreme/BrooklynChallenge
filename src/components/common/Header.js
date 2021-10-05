import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import Logo from './Logo';

const Header = props => {
  const handleShareButton = () => {
    console.log('handleShareButton pressed');
    console.log('props ', props);
  };

  return (
    <View style={styles.container}>
      {props.children === 'Home' && (
        <View style={styles.shareButtonContainer}>
          <IconButton
            icon="share-variant"
            color={Colors.red500}
            size={20}
            onPress={handleShareButton}
          />
        </View>
      )}
      <Logo props={props.children} />
      <Text style={styles.homePageHeaderTitle}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  homePageHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  shareButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? -12 : -12,
    right: Platform.OS === 'ios' ? -125 : -125,
    // bottom: 10,
    alignItems: 'center',
    width: 50,
    backgroundColor: 'grey',
  },
});

export default Header;
