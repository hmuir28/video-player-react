import React from 'react';
import PlaylistHeader from '../components/PlaylistHeader';
import PlaylistItems from './PlaylistItems';
import NightMode from '../components/NightMode';

import StyledPlaylist  from '../styles/StyledPlaylist';

const Playerlist = ({ videos, activeVideo, nightModeCallback, nightMode, selectVideo }) => (
  <StyledPlaylist>
    <NightMode nightModeCallback={nightModeCallback} nightMode={nightMode} />
    <PlaylistHeader active={activeVideo} total={videos.length} />
    <PlaylistItems videos={videos} active={activeVideo} selectVideo={selectVideo} />
  </StyledPlaylist>
);

export default Playerlist;
