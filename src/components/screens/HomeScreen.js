import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  Button,
  Modal,
  Portal,
  TextInput,
  Provider,
  Card,
} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {startLoading, hasError, addTeam} from '../../features/team/teamSlice';
import TeamCard from '../common/TeamCard';

const HomeScreen = ({route, navigation}) => {
  const [visible, setVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [cityName, setCityName] = useState('');
  const [screen, setScreen] = useState('Home');
  const teamState = useSelector(state => state.team);
  console.log('HOME route ', route);
  // const {screen} = route.params && route.params;
  const dispatch = useDispatch();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const isFocused = navigation.isFocused();

  useEffect(() => {
    console.log('HOME teamState', teamState);
    // console.log('HOME SCREEN ', screen);
    if (teamState.teams) {
      console.log('teamState.teams', teamState.teams);
    }
    // console.log('teamState.teams.player', teamState.teams.player);
    if (teamState.teams[0]) {
      console.log('teamState.teams[0]', teamState.teams[0]);
    }

    console.log('navigation ', navigation);
    console.log('screen', screen);
    // if (isFocused) {
    //   console.log('FOCUSED ', isFocused);
    //   setScreen('Home');
    // }
  }, [teamState, navigation, isFocused, screen]);
  console.log('HOME teamState.teams', teamState.teams[0]);
  console.log('HOME teamState.teams.length', teamState.teams.length);

  const handleAddTeam = () => {
    let customTeamId = '';
    let customTeamKey = '';

    if (teamState.teamCount === 3) {
      console.log('three', teamState.teamCount);
      // TODO: modal is still open here. need to resolve.
      return;
    }

    // TODO: may have to refactor to loop teams
    // check for active teams
    // set team state
    switch (teamState.teamCount) {
      case 0:
        dispatch(
          addTeam({
            key: 0,
            id: 1,
            name: teamName,
            city: cityName,
            players: [],
          }),
        );
        customTeamId = 1;
        customTeamKey = 0;
        break;
      case 1:
        dispatch(
          addTeam({
            key: 1,
            id: 2,
            name: teamName,
            city: cityName,
            players: [],
          }),
        );
        customTeamId = 2;
        customTeamKey = 1;
        break;
      case 2:
        dispatch(
          addTeam({
            key: 2,
            id: 3,
            name: teamName,
            city: cityName,
            players: [],
          }),
        );
        customTeamId = 3;
        customTeamKey = 2;
        break;
      default:
        break;
    }

    if (!teamState.teamCount) {
      console.log('zero', teamState.teamCount);
    }

    // if (
    //   teamState.teamOnIsActive ||
    //   teamState.teamTwoIsActive ||
    //   teamState.teamThreeIsActive
    // ) {
    // }
    // console.log('HomeS custom team id: ', customTeamId);

    setTeamName('');
    setCityName('');
    hideModal();

    navigation.navigate('Team Selection', {
      customTeamId,
      customTeamKey,
    });

    // console.log('teamState', teamState);
  };

  const handleClearTeam = () => {
    console.log('HANDLE CLEAR TEAM');
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal');
    setTeamName('');
    setCityName('');
    hideModal();
  };

  const renderItem = ({item}) => (
    // console.log('item, ', item);
    // console.log('HIT HOME ', item);
    // console.log('XXXXXXXXX');
    // console.log('teamName ', item.name);
    // console.log('city ', item.city);
    // console.log('navigation ', navigation);
    // console.log('customTeamId ', item.id);
    // console.log('customTeamKey ', item.key);
    // console.log('screen ', screen);
    // console.log('XXXXXXXXX');
    <TeamCard
      teamName={item.name}
      city={item.city}
      navigation={navigation}
      customTeamId={item.id}
      customTeamKey={item.key}
      screen={'Home'}
    />
  );

  return (
    <Provider>
      <View style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            style={styles.modalContainer}
            contentContainerStyle={styles.modalContent}>
            <View>
              {/* TODO: Add validation - no empty strings, max char */}
              <TextInput
                label="Team Name"
                value={teamName}
                onChangeText={value => setTeamName(value)}
                style={styles.modalInput}
              />
              <TextInput
                label="City Name"
                value={cityName}
                onChangeText={value => setCityName(value)}
                style={styles.modalInput}
              />
              <View style={styles.modalButtonContainer}>
                <Button
                  style={styles.newTeam}
                  icon="account-group"
                  mode="contained"
                  onPress={handleAddTeam}>
                  Add
                </Button>
                <Button
                  style={styles.clear}
                  icon="axe"
                  mode="contained"
                  onPress={handleCloseModal}>
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>

        <View style={styles.buttonContainer}>
          {/* TODO: Could be resuable component - also used in Edit Screen */}
          <Button
            style={styles.newTeam}
            icon="account-group"
            mode="contained"
            onPress={showModal}>
            Add New Team
          </Button>
          <Button
            style={styles.clear}
            icon="axe"
            mode="contained"
            onPress={handleClearTeam}>
            Clear
          </Button>
        </View>
        <View style={styles.teamCardsContainer}>
          {teamState.teams && (
            <>
              <FlatList
                data={teamState.teams && teamState.teams}
                renderItem={renderItem}
                keyExtractor={item => item.key}
              />
            </>
          )}
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
    margin: 40,
    marginTop: 190,
    marginBottom: 190,
    borderRadius: 10,
  },
  modalViewContainer: {
    backgroundColor: 'blue',
  },
  modalContent: {
    padding: 10,
  },
  modalInput: {
    margin: 5,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  newTeam: {
    backgroundColor: 'green',
  },
  clear: {
    backgroundColor: 'red',
  },
  teamCardsContainer: {
    margin: 10,
    paddingTop: 10,
  },
});

export default HomeScreen;
