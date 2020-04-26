import React from 'react';

import StyledPlaylistItem from '../styles/StyledPlaylistItem';

const PlaylistItem = ({ active, played, video, selectVideo }) => (
  <StyledPlaylistItem active={active} played={played} onClick={() => selectVideo(video)}>
    <div className="wbn-player__video-number">{video.num}</div>
    <div className="wbn-player__video-name">{video.title}</div>
    <div className="wbn-player__video-time">{video.duration}</div>
  </StyledPlaylistItem>
);

export default PlaylistItem;
