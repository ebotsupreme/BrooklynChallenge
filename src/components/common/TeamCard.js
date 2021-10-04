import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  Card,
  Paragraph,
  IconButton,
  Colors,
  Portal,
  Modal,
  TextInput,
  Button,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {removeTeam, editTeam} from '../../features/team/teamSlice';

const TeamCard = ({
  teamName,
  teamId = '',
  city = '',
  customTeamId = '',
  customTeamKey = '',
  navigation,
  screen = '',
}) => {
  const [visible, setVisible] = useState(false);
  const [editTeamName, setEditTeamName] = useState('');
  const [editTeamCity, setEditTeamCity] = useState('');
  const dispatch = useDispatch();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSelectTeam = selectedTeam => {
    navigation.navigate('Player Selection', {
      selectedTeamName: selectedTeam,
      selectedTeamId: teamId,
      customTeamId,
      customTeamKey,
    });
  };

  const handleEditTeam = () => {
    console.log('handleEditTeam visible ', visible);
    // show modal here
    showModal();
  };

  const handleRemoveTeam = () => {
    console.log('handleRemoveTeam');
    dispatch(
      removeTeam({
        name: teamName,
        team: [],
        customTeamId,
        customTeamKey,
      }),
    );
  };

  const handleEditTeamModal = () => {
    console.log('handleEditTeamModal');
    // dispatch edit team here
    dispatch(
      editTeam({
        name: editTeamName,
        city: editTeamCity,
        customTeamId,
        customTeamKey,
      }),
    );
    setEditTeamName('');
    setEditTeamCity('');
    hideModal();
  };

  const handleCloseModal = () => {
    console.log('handleCloseModal');
    setEditTeamName('');
    setEditTeamCity('');
    hideModal();
  };

  return (
    <>
      {screen === 'Edit' && (
        <>
          <Card style={styles.container}>
            <View style={styles.viewEditTeamContainer}>
              <Text style={styles.editTeamName}>{teamName}</Text>
              <Text style={styles.editTeamCity}>{city}</Text>
            </View>
          </Card>
        </>
      )}
      {screen === 'Home' && (
        <>
          {/* TODO: Modal may need to be a common component, also used in HomeScreen */}
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
                  value={editTeamName}
                  onChangeText={value => setEditTeamName(value)}
                  style={styles.modalInput}
                  maxLength={20}
                />
                <TextInput
                  label="City Name"
                  value={editTeamCity}
                  onChangeText={value => setEditTeamCity(value)}
                  style={styles.modalInput}
                  maxLength={20}
                />
                <View style={styles.modalButtonContainer}>
                  <Button
                    style={styles.newTeam}
                    icon="account-group"
                    mode="contained"
                    onPress={handleEditTeamModal}>
                    Edit
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
          <View style={{position: 'relative'}}>
            <Card style={styles.container}>
              <View style={styles.viewHomeTeamContainer}>
                <Text style={styles.editTeamName}>{teamName}</Text>
                <Text style={styles.editTeamCity}>{city}</Text>
              </View>
            </Card>
            <View style={styles.editTeamContainer}>
              <IconButton
                icon="account-edit"
                color={Colors.red500}
                size={30}
                onPress={showModal}
              />
            </View>
            <View style={styles.removeTeamContainer}>
              <IconButton
                icon="account-multiple-remove"
                color={Colors.red500}
                size={30}
                onPress={handleRemoveTeam}
              />
            </View>
          </View>
        </>
      )}
      {screen === 'SelectTeam' && (
        <>
          <Card
            style={styles.container}
            onPress={() => handleSelectTeam(teamName)}>
            <View style={styles.viewContainer}>
              <Text>{teamName}</Text>
              <MaterialIcons name="add" />
            </View>
          </Card>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewEditTeamContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editTeamName: {
    fontSize: 24,
    padding: 10,
    backgroundColor: 'yellow',
  },
  editTeamCity: {
    fontSize: 14,
    padding: 10,
    backgroundColor: 'blue',
  },
  viewHomeTeamContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
  editTeamContainer: {
    position: 'absolute',
    top: 53,
    right: 80,
    bottom: 10,
    alignItems: 'flex-end',
    // backgroundColor: 'grey',
    width: 50,
  },
  removeTeamContainer: {
    position: 'absolute',
    top: 53,
    right: 15,
    bottom: 10,
    alignItems: 'flex-end',
    // backgroundColor: 'blue',
    width: 50,
  },
  // MODAL Same css as HOMESCREEN
  modalContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
    margin: 40,
    marginTop: 190,
    marginBottom: 190,
    borderRadius: 10,
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

export default TeamCard;
