import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Stack, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from 'src/app/constants';
import ServersColumn from './components/ServersColumn';
import ServerInfoColumn from './components/ServerInfoColumn';
import ChatColumn from './components/ChatColumn';
import {
  getListJoinedServerAction,
  selectListJoinedServer,
} from 'src/features/server/serverSlice';
import useCheckAuth from 'src/hooks/useCheckAuth';

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

  const listJoinedServer = useSelector(selectListJoinedServer);

  const { isAuth, isGetMe } = useCheckAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListJoinedServerAction());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth && !isGetMe) {
      // navigate('/authen/login');
    }
  }, [isAuth, isGetMe, navigate]);

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
          <ChatColumn channel={channels[0]} />
        </Box>
      </Stack>
    </React.Fragment>
  );
};

export default HomePage;
