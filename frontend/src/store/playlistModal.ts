import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';

interface PlaylistModal {
  visible: boolean;
  selectedListId?: string;
}

const initialState: PlaylistModal = {
  visible: false,
};

const slice = createSlice({
  name: 'playlistModal',
  initialState,
  reducers: {
    updatePlaylistVisibility(playerState, {payload}: PayloadAction<boolean>) {
      playerState.visible = payload;
    },
    updateSelectedListId(playerState, {payload}: PayloadAction<string>) {
      playerState.selectedListId = payload;
    },
  },
});

// export const getPlaylistModalState = createSelector(
//   (state: RootState) => state.playlistModal,
//   modalState => modalState,
// );
export const getPlaylistModalState = (state: RootState) => state.playlistModal;

export const {updatePlaylistVisibility, updateSelectedListId} = slice.actions;
export default slice.reducer;
