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
      <Typography marginTop={1}>Username</Typography>
      <Box>
        <input
          value={username}
          style={styleInput}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Typography marginTop={1}>Password</Typography>
      <Box>
        <input
          value={username}
          type="password"
          style={styleInput}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Box py={2} align="right">
        <Button variant="contained">Done</Button>
      </Box>
    </Box>
  );
}

export function DialogEditName({ user }) {
  const [firstName, setFirstName] = React.useState(user.first_name);
  const [lastName, setLastName] = React.useState(user.last_name);
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
      <Typography marginTop={1}>First Name</Typography>
      <Box>
        <input
          value={firstName}
          style={styleInput}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Box>
      <Typography marginTop={1}>Last Name</Typography>
      <Box>
        <input
          value={lastName}
          style={styleInput}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Box>
      <Typography marginTop={1}>Password</Typography>
      <Box>
        <input type="password" style={styleInput} />
      </Box>
      <Box py={2} align="right">
        <Button variant="contained">Done</Button>
      </Box>
    </Box>
  );
}
