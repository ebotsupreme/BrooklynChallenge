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
  // teamOne: {
  //   id: '',
  //   name: '',
  //   city: '',
  //   players: [],
  // },
  // teamTwo: {
  //   id: '',
  //   name: '',
  //   city: '',
  //   players: [],
  // },
  // teamThree: {
  //   id: '',
  //   name: '',
  //   city: '',
  //   players: [],
  // },
  teams: [
    // {
    //   teamOne: {
    //     id: '',
    //     name: '',
    //     city: '',
    //     players: [],
    //   },
    // },
    // {
    //   teamTwo: {
    //     id: '',
    //     name: '',
    //     city: '',
    //     players: [],
    //   },
    // },
    // {
    //   teamThree: {
    //     id: '',
    //     name: '',
    //     city: '',
    //     players: [],
    //   },
    // },
  ],
};

/*
players: [
          {
            playerOne: {
              id: '',
              name: '',
              image: '',
            },
            playerTwo: {
              id: '',
              name: '',
              image: '',
            },
            playerThree: {
              id: '',
              name: '',
              image: '',
            },
            playerFour: {
              id: '',
              name: '',
              image: '',
            },
            playerFive: {
              id: '',
              name: '',
              image: '',
            },
          },
        ],
*/

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
      // state.activeTeams = [...state.activeTeams, `team${state.teamCount += 1}isActive`]
      state.isLoading = false;
    },
    updateTeamOne: (state, action) => {
      state.teams[0].teamOne = action.payload;
      state.teamOneIsActive = true;
      state.isLoading = false;
      state.isLoaded = true;
    },
    updateTeamTwo: (state, action) => {
      state.teams[1].teamTwo = action.payload;
      state.teamOneIsActive = true;
      state.isLoading = false;
      state.isLoaded = true;
    },
    updateTeamThree: (state, action) => {
      state.teams[2].teamThree = action.payload;
      state.teamOneIsActive = true;
      state.isLoading = false;
      state.isLoaded = true;
    },
    addPlayer: (state, action) => {
      console.log(
        'action.payload',
        action.payload,
        ' state.teams.players ',
        state.teams.players,
      );
      console.log('state.teams ', state.teams);
      console.log('action.payload.customTeamKey', action.payload.customTeamKey);
      console.log(
        'state.teams[action.payload.customTeamKey]',
        state.teams[action.payload.customTeamKey],
      );
      console.log('state.teams[0] ', state.teams[0]);
      console.log('state.teams[0].players ', state.teams[0].players);
      state.teams[action.payload.customTeamKey].players = [
        ...state.teams[action.payload.customTeamKey].players,
        action.payload,
      ];
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
} = teamSlice.actions;

export default teamSlice.reducer;
