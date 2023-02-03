import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Stack, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_NAME } from 'src/app/constants';
import ServersColumn from './components/ServersColumn';
import ServerInfoColumn from './components/ServerInfoColumn';
import ChatColumn from './components/ChatColumn';
import {
  getChannelInfoAction,
  getListJoinedServerAction,
  getServerInfoAction,
  selectListJoinedServer,
} from 'src/features/server/serverSlice';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const channels = [
  {
    id: 1,
    name: 'General',
    type: 'text',
  },
  {
    id: 2,
    name: 'Learning',
    type: 'text',
  },
  {
    id: 3,
    name: 'Voice main',
    type: 'voice',
  },
  {
    id: 4,
    name: 'Gaming',
    type: 'voice',
  },
];

const HomePage = () => {
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    const { serverId, channelId } = params;

    if (serverId) {
      dispatch(getServerInfoAction(serverId));
    }

    if (serverId && channelId) {
      dispatch(getChannelInfoAction(channelId));
    }
  }, [dispatch, params]);

  const listJoinedServer = useSelector(selectListJoinedServer);

  const { isAuth, isGetMe } = useCheckAuth();
  const navigate = useNavigate();

  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    dispatch(getListJoinedServerAction());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth && !isGetMe) {
      navigate('/authen/login');
    } else if (isAuth && !socket) {
      setSocket(
        io(process.env.REACT_APP_WS_SERVER, {
          query: {
            accessToken: Cookies.get('accessToken'),
          },
        })
      );
    }
  }, [isAuth, isGetMe, navigate, socket]);

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Home | ${APP_NAME}`}</title>
      </Helmet>

      <Stack height="100vh" direction="row">
        <Box height="100%" maxWidth={80}>
          <ServersColumn servers={listJoinedServer} />
        </Box>

        <Box height="100%" maxWidth={250}>
          <ServerInfoColumn />
        </Box>

        <Box height="100%" width="100%">
          <ChatColumn channel={channels[0]} socket={socket} />
        </Box>
      </Stack>
    </React.Fragment>
  );
};

export default HomePage;
