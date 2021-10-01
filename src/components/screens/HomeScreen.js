import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button, Modal, Portal, TextInput, Provider} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {
  startLoading,
  hasError,
  updateTeamOne,
  updateTeamTwo,
  updateTeamThree,
  addTeam,
} from '../../features/team/teamSlice';

const HomeScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [cityName, setCityName] = useState('');
  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();

  let deviceWidth = Dimensions.get('window').width;
  let deviceHeight = Dimensions.get('window').height;
  let modalWidth = deviceWidth / 2;
  let modalHeight = deviceHeight / 2;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    console.log('teamState', teamState);
    console.log('teamState.teams', teamState.teams);
  }, [teamState]);

  const handleAddTeam = () => {
    let customTeamId = '';
    console.log('handleAddTeam pressed');
    console.log('teamName ', teamName);
    console.log('cityName: ', cityName);
    console.log('teamState', teamState);

    if (teamState.teamCount === 3) {
      console.log('three', teamState.teamCount);
      return;
    }

    // TODO: may have to refactor to loop teams
    // check for active teams
    // set team state
    switch (teamState.teamCount) {
      case 0:
        dispatch(
          addTeam({
            teamOne: {
              id: 1,
              name: teamName,
              city: cityName,
              players: [],
            },
          }),
        );
        customTeamId = 1;
        break;
      case 1:
        dispatch(
          addTeam({
            teamTwo: {
              id: 2,
              name: teamName,
              city: cityName,
              players: [],
            },
          }),
        );
        customTeamId = 2;
        break;
      case 2:
        dispatch(
          addTeam({
            teamThree: {
              id: 3,
              name: teamName,
              city: cityName,
              players: [],
            },
          }),
        );
        customTeamId = 3;
        break;
      default:
        break;
    }

    if (!teamState.teamCount) {
      console.log('zero', teamState.teamCount);
    }

    if (
      teamState.teamOnIsActive ||
      teamState.teamTwoIsActive ||
      teamState.teamThreeIsActive
    ) {
    }
    console.log('HomeS custom team id: ', customTeamId);
    navigation.navigate('Team Selection', {
      customTeamId,
    });

    // console.log('teamState', teamState);
  };

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
                  onPress={hideModal}>
                  Cancel
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>

        <View style={styles.buttonContainer}>
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
            onPress={() => console.log('clear all Pressed')}>
            Clear
          </Button>
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
});

export default HomeScreen;
