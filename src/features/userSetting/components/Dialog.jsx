import React from 'react';
import { Box, Button, colors, Typography } from '@mui/material';

const styleDialog = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  color: colors.grey[400],
  transform: 'translate(-50%, -50%)',
  width: 500,

  bgcolor: colors.grey[800],
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const styleInput = {
  border: 'none',
  width: '100%',
  height: '32px',
  outline: 'none',
  color: 'white',
  fontSize: '16px',
  backgroundColor: 'gray',
};

export function DialogEditUsername({ user }) {
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
    <Box sx={styleDialog}>
      <Typography
        align="center"
        color={colors.grey[100]}
        id="modal-modal-title"
        variant="h5"
        component="h2"
      >
        Change your Username
      </Typography>
      <Typography
        align="center"
        variant="subtitle1"
        id="modal-modal-description"
      >
        Enter a new username and your existing password.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography marginTop={1}>Username</Typography>
        <Box>
          <input
            name="username"
            id="username"
            value={username}
            style={styleInput}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Typography marginTop={1}>Password</Typography>
        <Box>
          <input
            name="password"
            id="password"
            type="password"
            style={styleInput}
          />
        </Box>
        <Box py={2} align="right">
          <Button type="submit" variant="contained">
            Done
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export function DialogEditName({ user }) {
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
    <Box sx={styleDialog}>
      <Typography
        align="center"
        color={colors.grey[100]}
        id="modal-modal-title"
        variant="h5"
        component="h2"
      >
        Change your Username
      </Typography>
      <Typography
        align="center"
        variant="subtitle1"
        id="modal-modal-description"
      >
        Enter a new username and your existing password.
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography marginTop={1}>First Name</Typography>
        <Box>
          <input
            value={firstName}
            style={styleInput}
            name="first_name"
            id="first_name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>
        <Typography marginTop={1}>Last Name</Typography>
        <Box>
          <input
            value={lastName}
            style={styleInput}
            name="last_name"
            id="last_name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Typography marginTop={1}>Password</Typography>
        <Box>
          <input
            name="password"
            id="password"
            type="password"
            style={styleInput}
          />
        </Box>
        <Box py={2} align="right">
          <Button type="submit" variant="contained">
            Done
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export function DialogChangePassword() {
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
    <Box sx={styleDialog}>
      <Typography
        align="center"
        color={colors.grey[100]}
        id="modal-modal-title"
        variant="h5"
        component="h2"
      >
        Update your password
      </Typography>
      <Typography
        align="center"
        variant="subtitle1"
        id="modal-modal-description"
      >
        Enter a your current password and a new password
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography marginTop={1}>Current Password</Typography>
        <Box>
          <input
            name="password"
            id="password"
            type="password"
            style={styleInput}
          />
        </Box>
        <Typography marginTop={1}>New Password</Typography>
        <Box>
          <input
            name="new_password"
            id="new_password"
            type="password"
            style={styleInput}
          />
        </Box>
        <Typography marginTop={1}>Confirm New Password</Typography>
        <Box>
          <input
            name="confirm_new_password"
            id="confirm_new_password"
            type="password"
            style={styleInput}
          />
        </Box>
        <Box py={2} align="right">
          <Button type="submit" variant="contained">
            Done
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
