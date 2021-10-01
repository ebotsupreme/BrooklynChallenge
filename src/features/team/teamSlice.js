import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLoaded: false,
  error: false,
  teamOneIsActive: false,
  teamTwoIsActive: false,
  teamThreeIsActive: false,
  teamOne: {
    id: '',
    name: '',
    city: '',
    players: [],
  },
  teamTwo: {
    id: '',
    name: '',
    city: '',
    players: [],
  },
  teamThree: {
    id: '',
    name: '',
    city: '',
    players: [],
  },
  teams: [
    {
      teamOne: {
        id: '',
        name: '',
        city: '',
        players: [],
      },
    },
    {
      teamTwo: {
        id: '',
        name: '',
        city: '',
        players: [],
      },
    },
    {
      teamThree: {
        id: '',
        name: '',
        city: '',
        players: [],
      },
    },
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
    updateTeamOne: (state, action) => {
      state.teamOne = action.payload;
      state.teamOneIsActive = true;
      state.isLoading = false;
      state.isLoaded = true;
    },
    updateTeamTwo: (state, action) => {
      state.teamOne = action.payload;
      state.teamOneIsActive = true;
      state.isLoading = false;
      state.isLoaded = true;
    },
    updateTeamThree: (state, action) => {
      state.teamOne = action.payload;
      state.teamOneIsActive = true;
      state.isLoading = false;
      state.isLoaded = true;
    },
    // teamSuccess: (state, action) => {
    //   state.
    // },
  },
});

export const {
  startLoading,
  hasError,
  updateTeamOne,
  updateTeamTwo,
  updateTeamThree,
} = teamSlice.actions;

export default teamSlice.reducer;
