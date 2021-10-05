import React, {useState} from 'react';
import {Text, View, StyleSheet, Platform, Share} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';

const Header = props => {
  const [message, setMessage] = useState([]);
  const teamState = useSelector(state => state.team);

  const handleShareButton = () => {
    let shareTeamPlayers = [];

    teamState.teams.map(team => {
      shareTeamPlayers.push(` Team: ${team.name} - Players:`);
      team.players.map(player => {
        shareTeamPlayers.push(` ${player.name}`);
      });
    });
    shareMessage(shareTeamPlayers);
  };

  const shareMessage = payload => {
    const payloadString = payload.join(' ');
    setMessage(payloadString);
    Share.share({
      message: payloadString,
    })
      // TODO: Add result or error message to Snackbar
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };

  return (
    <View style={styles.container}>
      {props.children === 'Home' && Platform.OS === 'ios' && (
        <View style={styles.shareButtonContainer}>
          <IconButton
            icon="share-variant"
            color={'#072F5F'}
            size={20}
            onPress={handleShareButton}
          />
        </View>
      )}
      {/* TODO: needs implementation on Android - currently disabled */}
      {/* <Logo props={props.children} /> */}
      <Text style={styles.homePageHeaderTitle}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homePageHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  shareButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? -12 : -10,
    right: Platform.OS === 'ios' ? -125 : -270,
    alignItems: 'center',
    width: 50,
  },
});

export default Header;
