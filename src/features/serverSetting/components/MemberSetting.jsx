import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import * as React from 'react';

const _mockUsers_ = [
  {
    name: 'John Smith',
    avatarUrl: 'https://example.com/avatar1.jpg',
    username: 'jsmith',
    roles: ['admin', 'moderator'],
  },
  {
    name: 'Jane Doe',
    avatarUrl: 'https://example.com/avatar2.jpg',
    username: 'jdoe',
    roles: ['member'],
  },
  {
    name: 'Bob Johnson',
    avatarUrl: 'https://example.com/avatar3.jpg',
    username: 'bjohnson',
    roles: ['member'],
  },
];

const MemberSetting = () => {
  return (
    <>
      <Stack>
        <Typography variant="h5" component="h2">
          Members
        </Typography>
        <Typography variant="subtitle1" component="p" color={'GrayText'} mb={4}>
          Manage your server members.
        </Typography>

        <Box display="flex" mb={2} sx={{ width: '100%' }}>
          <FormControl fullWidth size="small" sx={{ mr: 1, width: '50ch' }}>
            <InputLabel>Search member</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end" sx={{ color: 'GrayText' }}>
                  <SearchIcon />
                </InputAdornment>
              }
              label="Search member"
            />
          </FormControl>
          <Button variant="outlined">Invite member</Button>
        </Box>

        <List>
          {_mockUsers_.map((user, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.avatarUrl} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.username} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Stack>
    </>
  );
};

export default MemberSetting;
