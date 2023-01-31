import React from 'react';
import {
  IconButton,
  Stack,
  Typography,
  useTheme,
  Avatar,
  colors,
  TextField,
  Box,
  InputBase,
} from '@mui/material';
import {
  NotificationsRounded as NotificationIcon,
  PeopleAltRounded as PeopleIcon,
  AddCircleRounded as AddIcon,
  SendOutlined,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useCheckAuth from 'src/hooks/useCheckAuth';

function ChatColumn({ socket }) {
  const theme = useTheme();

  const curChannel = useSelector((state) => state.servers.currentChannel);
  const { userData } = useCheckAuth();

  const [msgInput, setMsgInput] = React.useState('');

  useEffect(() => {
    curChannel?._id &&
      userData?._id &&
      socket &&
      socket.emit('joinVoiceChannel', {
        userId: userData?._id,
        channelId: curChannel?._id,
      });
  }, [curChannel?._id, socket, userData?._id]);

  return (
    <Stack height="100%" width="100%" backgroundColor={theme.palette.grey[850]}>
      <Stack direction="row" p={1} boxShadow={theme.shadows[1]}>
        <Typography
          variant="subtitle1"
          component="h2"
          fontWeight="bold"
          alignSelf="center"
        >
          # {curChannel.name}
        </Typography>

        <Stack direction="row" ml="auto" alignItems="center" spacing={1}>
          <IconButton>
            <NotificationIcon />
          </IconButton>

          <IconButton>
            <PeopleIcon />
          </IconButton>

          <TextField size="small" placeholder="Search" />
        </Stack>
      </Stack>

      <Stack
        height="100%"
        width="100%"
        p={1}
        pr={12}
        spacing={1}
        sx={{ overflowY: 'scroll' }}
      >
        {curChannel?.messages?.map((message) => (
          <Stack key={message?._id} direction="row" p={1} spacing={2}>
            <Avatar sizes="3" src={message?.author?.avatar} />

            <Stack direction="column" width="100%">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="subtitle1"
                  component="span"
                  fontWeight="bold"
                >
                  {message?.author?.name}
                </Typography>
                <Typography variant="caption" component="span">
                  {message?.time}
                </Typography>
              </Stack>

              <Typography variant="body1" component="p">
                {message?.content}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Box pb={2} px={2} sx={{ backgroundColor: 'transparent' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            backgroundColor: colors.grey[800],
            borderRadius: 2,
          }}
        >
          <IconButton>
            <AddIcon />
          </IconButton>

          <InputBase
            placeholder="Message #general"
            variant="standard"
            multiline
            maxRows={10}
            fullWidth
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
          />

          <IconButton
            onClick={() => {
              // socket.emit()
            }}
          >
            <SendOutlined />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  );
}

export default ChatColumn;
