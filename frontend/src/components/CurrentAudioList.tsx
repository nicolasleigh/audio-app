// import React from 'react';
// import {useSelector} from 'react-redux';
// import useAudioController from '../hooks/useAudioController';
// import {getPlayerState} from '../store/player';
// import AudioListContainer from './AudioListContainer';

// interface Props {
//   visible: boolean;
//   onRequestClose(): void;
// }

// export default function CurrentAudioList({visible, onRequestClose}: Props) {
//   const {onGoingList} = useSelector(getPlayerState);
//   const {onAudioPress} = useAudioController();
//   return (
//     <AudioListContainer
//       header="Audios on the way"
//       visible={visible}
//       onRequestClose={onRequestClose}
//       data={onGoingList}
//       onItemPress={onAudioPress}
//     />
//   );
// }
