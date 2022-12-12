import React from 'react';
import { Box, Button, colors, Typography, Stack, Input } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const styleInput = {
  paddingLeft: '8px',
  width: '100%',
  height: '32px',
  color: 'white',
  fontSize: '16px',
  bgcolor: colors.grey[900],
};

export function DialogEditUsername(props) {
  const user = props.user;
  const closeDialog = () => {
    setTimeout(() => {
      props.handleCloseModal(true);
    }, 1);
  };
  const [username, setUsername] = React.useState(user.username);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
  };
  return (
    <Stack
      sx={{ bgcolor: colors.grey[800], width: 500, color: colors.grey[200] }}
    >
      <DialogTitle align="center">
        Change your Username
        <Typography align="center" sx={{ color: colors.grey[400] }}>
          Enter a new username and your existing password.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography marginTop={1}>Username</Typography>
          <Box>
            <Input
              name="username"
              sx={styleInput}
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Typography marginTop={1}>Password</Typography>
          <Box>
            <Input
              name="password"
              id="password"
              type="password"
              sx={styleInput}
            />
          </Box>
          <Box pt={3} align="right">
            <Button
              onClick={closeDialog}
              sx={{ marginRight: 2, color: 'white' }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={closeDialog}>
              Done
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Stack>
  );
}

export function DialogEditName(props) {
  const user = props.user;
  const closeDialog = () => {
    setTimeout(() => {
      props.handleCloseModal(true);
    }, 1);
  };
  const [firstName, setFirstName] = React.useState(user.first_name);
  const [lastName, setLastName] = React.useState(user.last_name);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      password: data.get('password'),
    });
  };
  return (
    <Stack
      sx={{ bgcolor: colors.grey[800], width: 500, color: colors.grey[200] }}
    >
      <DialogTitle align="center">
        Change your Name
        <Typography align="center" sx={{ color: colors.grey[400] }}>
          Enter a new name and your existing password.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography marginTop={1}>First Name</Typography>
          <Box>
            <Input
              value={firstName}
              sx={styleInput}
              name="first_name"
              id="first_name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Typography marginTop={1}>Last Name</Typography>
          <Box>
            <Input
              value={lastName}
              sx={styleInput}
              name="last_name"
              id="last_name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Typography marginTop={1}>Password</Typography>
          <Box>
            <Input
              name="password"
              id="password"
              type="password"
              sx={styleInput}
            />
          </Box>
          <Box pt={3} align="right">
            <Button
              onClick={closeDialog}
              sx={{ marginRight: 2, color: 'white' }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={closeDialog}>
              Done
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Stack>
  );
}

export function DialogChangePassword(props) {
  const closeDialog = () => {
    setTimeout(() => {
      props.handleCloseModal(true);
    }, 1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get('password'),
      new_password: data.get('new_password'),
      confirm_new_password: data.get('confirm_new_password'),
    });
  };
  return (
    <Stack
      sx={{ bgcolor: colors.grey[800], width: 500, color: colors.grey[200] }}
    >
      <DialogTitle align="center">
        Update your password
        <Typography align="center" sx={{ color: colors.grey[400] }}>
          Enter a your current password and a new password.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography marginTop={1}>Current Password</Typography>
          <Box>
            <Input
              name="password"
              id="password"
              type="password"
              sx={styleInput}
            />
          </Box>
          <Typography marginTop={1}>New Password</Typography>
          <Box>
            <Input
              name="new_password"
              id="new_password"
              type="password"
              sx={styleInput}
            />
          </Box>
          <Typography marginTop={1}>Confirm New Password</Typography>
          <Box>
            <Input
              name="confirm_new_password"
              id="confirm_new_password"
              type="password"
              sx={styleInput}
            />
          </Box>
          <Box pt={3} align="right">
            <Button
              onClick={closeDialog}
              sx={{ marginRight: 2, color: 'white' }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" onClick={closeDialog}>
              Done
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Stack>
  );
}
