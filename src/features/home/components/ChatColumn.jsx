import React, { useState } from 'react';
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
} from '@mui/icons-material';

const message = {
  id: 2,
  author: 'John Doe',
  content:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium veniam libero molestias delectus neque, ducimus vel deleniti eum sit. Tempora eos fuga, aliquam quidem laborum vero ratione cum ipsam dicta?',
  time: '12:00',
  avatar: 'https://mui.com/static/images/avatar/2.jpg',
};

function ChatColumn({ channel }) {
  const theme = useTheme();

  const [messages, setMessages] = useState(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => ({
      ...message,
      id: i,
      time: new Date().toLocaleTimeString(),
    }))
  );

  return (
    <Stack height="100%" width="100%" backgroundColor={theme.palette.grey[850]}>
      <Stack direction="row" p={1} boxShadow={theme.shadows[1]}>
        <Typography
          variant="subtitle1"
          component="h2"
          fontWeight="bold"
          alignSelf="center"
        >
          # {channel.name}
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

      <Stack height="100%" width="100%" p={1} pr={12} spacing={1} sx={{ overflowY: 'scroll' }}>
        {messages.map((message) => (
          <Stack key={message.id} direction="row" p={1} spacing={2}>
            <Avatar sizes="3" />

            <Stack direction="column" width="100%">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="subtitle1"
                  component="span"
                  fontWeight="bold"
                >
                  {message.author}
                </Typography>
                <Typography variant="caption" component="span">
                  {message.time}
                </Typography>
              </Stack>

              <Typography variant="body1" component="p">
                {message.content}
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
          />
        </Stack>
      </Box>
    </Stack>
  );
}

export default ChatColumn;
