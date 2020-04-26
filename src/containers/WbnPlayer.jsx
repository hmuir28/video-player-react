import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'firebase/firestore';

import Dropdown from '../components/Dropdown';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import Playlist from './Playlist';
import Spinner from '../components/Spinner';
import Video from '../components/Video';

import { FirebaseContext } from '../utils/firebase';
import StyledNavbar from '../styles/StyledNavbar';
import StyledWbnPlayer from '../styles/StyledWbnPlayer';

const theme = {
  bgcolor: '#353535',
  bgcolorItem: '#414141',
  bgcolorItemActive: '#405c63',
  bgcolorPlayed: '#526d4e',
  border: 'none',
  borderPlayer: 'none',
  color: '#fff',
};

const themeLight = {
  bgcolor: '#fff',
  bgcolorItem: '#fff',
  bgcolorItemActive: '#80a7b1',
  bgcolorPlayed: '#7d9979',
  border: '1px solid #353535',
  borderPlayer: 'none',
  color: '#353535',
};

const WbnPlayer = ({ history }) => {

  const firebase = useContext(FirebaseContext);
  const ref = firebase.firestore().collection(`videos`);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [state, setState] = useState({
    videos: [],
    activeVideo: { title: '' },
    nightMode: true,
    playlistId: null,
    autoplay: false,
  });

  const getVideos = () => {
    return firebase.auth()
      .onAuthStateChanged(async (userAuth) => {
        try {
          const {
            success,
            error,
          } = await getUserDoc(userAuth);

          if (error) throw new Error();

          const videos = await ref.get();
          const { uid } = success;
          if (!videos) {
            setState(wbnPlayer => wbnPlayer.videos = []);
          } else {
            const videosAccumulator = videos.docs.reduce((acc, cur) => {
              const { userId, playlist } = cur.data();
              if (uid === userId) {
                acc = playlist;
              }
              return acc;
            }, []);
            setState(wbnPlayer => {
              const activeVideo = videosAccumulator.length > 0 && videosAccumulator[0];
              return {
                ...wbnPlayer,
                videos: videosAccumulator,
                activeVideo,
              };
            });
            setLoading(false);
          }
        } catch ({ message }) {
          // TODO: add the exception handler.
        }
      });
  };

  useEffect(() => {
    const unsubscribe = getVideos();

    // Cleanup subscription on unmount
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    firebase.auth().signOut();
  };

  const getUserDoc = async ({ uid }) => {
    if (!uid) return null;

    const eventHandler = {
      success: null,
      error: null,
    };
    try {
      const user = await firebase.firestore()
        .doc(`users/${uid}`)
        .get();

      const retrieveUsers = user.data();
      const userDoc = {
        uid,
        ...retrieveUsers,
      };
      setUser({ ...userDoc });
      eventHandler.success = userDoc;
    } catch ({ message }) {
      eventHandler.error = message;
    }
    return eventHandler;
  };

  const nightModeCallback = () => (
    setState({
      ...state,
      nightMode: !state.nightMode,
    })
  )

  const selectVideo = video => (
    setState({
      ...state,
      activeVideo: video,
    })
  )

  return (
    <ThemeProvider theme={state.nightMode ? theme : themeLight}>
      <StyledNavbar>
        <Navbar
          alignLinks="right"
          brand={<Icon>account_box</Icon>}
          id="mobile-nav"
          options={{
            draggable: true,
            edge: 'left',
            inDuration: 250,
            outDuration: 200,
            preventScrolling: true
          }}
        >
          <Dropdown
            id="wbnplayer__dropdown"
            options={{
              alignment: 'left',
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              inDuration: 150,
              outDuration: 250,
            }}
            trigger={<a href="#!">{user && user.displayName}<Icon  right>arrow_drop_down</Icon></a>}
          >
            <Link
              onClick={logout}
              to={'signin'}
            >
              Sign Out
            </Link>
          </Dropdown>
        </Navbar>
      </StyledNavbar>
      {loading ? 
      (<Spinner />) :
      state.videos ? (
        <StyledWbnPlayer>
          <Video
            active={state.activeVideo}
            autoplay={state.autoplay}
          />
          <Playlist
            videos={state.videos}
            activeVideo={state.activeVideo}
            nightModeCallback={nightModeCallback}
            nightMode={state.nightMode}
            selectVideo={selectVideo}
          />
        </StyledWbnPlayer>
      ) : null}
    </ThemeProvider>
  );
}

export default WbnPlayer;
