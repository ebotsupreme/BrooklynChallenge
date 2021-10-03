import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLoaded: false,
  error: false,
  teamCount: 0,
  activeTeams: [],
  teamOneIsActive: false,
  teamTwoIsActive: false,
  teamThreeIsActive: false,
  teams: [],
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
      state.isLoaded = false;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoaded = false;
    },
    addTeam: (state, action) => {
      state.teams = [...state.teams, action.payload];
      state.teamCount += 1;
      state.isLoading = false;
    },
    addPlayer: (state, action) => {
      state.teams[action.payload.customTeamKey].players = [
        ...state.teams[action.payload.customTeamKey].players,
        action.payload,
      ];
      state.isLoading = false;
    },
    removePlayer: (state, action) => {
      state.teams[action.payload.customTeamKey].players = state.teams[
        action.payload.customTeamKey
      ].players.filter(player => player.id !== action.payload.id);
      state.isLoading = false;
    },
    removeAllPlayers: (state, action) => {
      console.log('removeAllPlayers action.payload ', action.payload);
      state.teams[action.payload.customTeamKey].players =
        action.payload.players;
      state.isLoading = false;
    },
  },
});

export const {
  startLoading,
  hasError,
  updateTeamOne,
  updateTeamTwo,
  updateTeamThree,
  addTeam,
  addPlayer,
  removePlayer,
  removeAllPlayers,
} = teamSlice.actions;

export default teamSlice.reducer;
