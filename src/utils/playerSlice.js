import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    soundId: null,
    isPlaying: false,
    sound: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.soundId = action.payload.soundId;
      state.isPlaying = action.payload.isPlaying;
      state.sound = action.payload.sound;
    },
},
});

export const { setActiveSong } = playerSlice.actions;

export default playerSlice.reducer;