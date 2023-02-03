import React from 'react';
import {
  Typography,
  Box,
  Stack,
  Avatar,
  colors,
  InputBase,
  IconButton,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { formatDistanceToNowStrict, format } from 'date-fns';
import {
  AddCircleRounded as AddIcon,
  SendOutlined as SendIcon,
} from '@mui/icons-material';

function formatRelativeTimestamp(timestamp) {
  const now = new Date();
  const difference = now.getTime() - timestamp.getTime();
  const oneHourInMilliseconds = 60 * 60 * 1000;
  const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;

  if (difference >= oneMonthInMilliseconds) {
    return format(timestamp, 'MMM dd, hh:mm a');
  } else if (difference >= oneHourInMilliseconds) {
    return format(timestamp, 'hh:mm a');
  }

  return formatDistanceToNowStrict(timestamp, { addSuffix: true });
}

function TextChatCpn({ socket }) {
  const curChannel = useSelector((state) => state.servers.currentChannel);
  const [msgInput, setMsgInput] = React.useState('');

  const ref = React.useRef(null);

  React.useEffect(() => {
    // scroll to bottom
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [curChannel.messages.length]);

  return (
    <>
      <Stack
        height="100%"
        width="100%"
        p={1}
        pr={12}
        spacing={1}
        sx={{ overflowY: 'scroll' }}
        ref={ref}
      >
        {curChannel?.messages?.map((message) => (
          <Stack key={message?._id} direction="row" p={1} spacing={2}>
            <Avatar sizes="3" src={message?.author?.avatarUrl} />

            <Stack direction="column" width="100%">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="subtitle1"
                  component="span"
                  fontWeight="bold"
                >
                  {message?.author?.fullname}
                </Typography>
                <Typography variant="caption" component="span">
                  {formatRelativeTimestamp(new Date(message?.createdAt))}
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
            placeholder={`Message #${curChannel.name}`}
            variant="standard"
            multiline
            maxRows={10}
            fullWidth
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === 'Enter' && msgInput.length > 0) {
                socket.emit('sendMessage', {
                  channelId: curChannel?._id,
                  content: msgInput,
                });
                setMsgInput('');
              }
            }}
          />

          <IconButton
            onClick={() => {
              msgInput.length > 0 &&
                socket.emit('sendMessage', {
                  channelId: curChannel?._id,
                  content: msgInput,
                });
              setMsgInput('');
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
}

export default TextChatCpn;
