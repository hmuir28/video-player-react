import React from 'react';
import PlaylistItem from '../components/PlaylistItem';

import StyledPlaylistItems from '../styles/StyledPlaylistItems';

const PlaylistItems = ({ active, videos, selectVideo }) => (
  <StyledPlaylistItems>
    {videos.map(video => (
      <PlaylistItem
        key={video.id}
        video={video}
        active={video.id === active.id}
        played={video.played}
        selectVideo={selectVideo}
      />
    ))}
  </StyledPlaylistItems>
);

export default PlaylistItems;
