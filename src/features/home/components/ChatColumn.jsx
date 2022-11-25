import React from 'react';
import {
  IconButton,
  Stack,
  Typography,
  useTheme,
  OutlinedInput,
  Avatar,
} from '@mui/material';
import {
  NotificationsRounded as NotificationIcon,
  PeopleAltRounded as PeopleIcon,
} from '@mui/icons-material';

const messages = [
  {
    id: 1,
    author: 'John Doe',
    content: 'Hey, how are you?',
    time: '12:00',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
  },
  {
    id: 2,
    author: 'John Doe',
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium veniam libero molestias delectus neque, ducimus vel deleniti eum sit. Tempora eos fuga, aliquam quidem laborum vero ratione cum ipsam dicta?',
    time: '12:00',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
  },
];

function ChatColumn({ channel }) {
  const theme = useTheme();

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

          <OutlinedInput size="small" placeholder="Search" />
        </Stack>
      </Stack>

      <Stack height="100%" width="100%">
        {messages.map((message) => (
          <Stack key={message.id} direction="row" p={1} spacing={1}>
            <Avatar sizes='3'/>
            <Stack direction="column" width="100%">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle1" component="span" fontWeight="bold">
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
    </Stack>
  );
}

export default ChatColumn;
