import React from 'react';
import { Box, Button, Stack, colors, Divider, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import {
  DialogChangePassword,
  DialogEditName,
  DialogEditUsername,
} from './Dialog';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyAccount({ user }) {
  const [index, setIndex] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseModal = (isOpen) => {
    setOpenDialog(!isOpen);
    console.log(!openDialog);
  };
  return (
    <Stack>
      <Stack width="100%" py={2} color={colors.grey[100]}>
        <Typography variant="h5">My Account</Typography>
      </Stack>
      <Card
        sx={{
          width: 680,
          height: 350,
          borderRadius: 2,
          backgroundColor: colors.grey[900],
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          color={colors.grey[200]}
          fontSize="1.5rem"
          p={4}
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                marginRight: 2,
              }}
              alt="Remy Sharp"
              src={user.avatar}
            />
            {user.first_name} {user.last_name}
          </Stack>
        </Stack>
        <Box
          color={colors.grey[100]}
          m="auto"
          backgroundColor={colors.grey[800]}
          sx={{
            width: 620,
            height: 180,
            borderRadius: 2,
            fontSize: '1.2rem',
          }}
        >
          <Stack py={1.5} px={2} justifyContent="space-between" direction="row">
            Username: {user.username}
            <Button
              onClick={() => {
                setIndex(0);
                setOpenDialog(true);
              }}
              variant="contained"
            >
              Edit
            </Button>
          </Stack>

          <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpenDialog(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <div>
              {(() => {
                switch (index) {
                  case 1:
                    return (
                      <DialogEditName
                        user={user}
                        handleCloseModal={handleCloseModal}
                      />
                    );
                  case 0:
                    return (
                      <DialogEditUsername
                        user={user}
                        handleCloseModal={handleCloseModal}
                      />
                    );
                  case 2:
                    return;
                  case 3:
                    return (
                      <DialogChangePassword
                        handleCloseModal={handleCloseModal}
                      />
                    );
                  default:
                    return <DialogEditName />;
                }
              })()}
            </div>
          </Dialog>
          <Stack py={1.5} px={2} justifyContent="space-between" direction="row">
            Name: {user.first_name} {user.last_name}
            <Button
              onClick={() => {
                setIndex(1);
                setOpenDialog(true);
              }}
              variant="contained"
            >
              Edit
            </Button>
          </Stack>
          <Stack py={1.5} px={2} justifyContent="space-between" direction="row">
            Email: {user.email}
            <Button variant="contained">Edit</Button>
          </Stack>
        </Box>
      </Card>
      <Box py={2}>
        <Divider color={colors.grey[500]} />
      </Box>
      <Box color={colors.grey[100]}>
        <Typography py={1} variant="h5">
          Password and Authentication
        </Typography>
        <Button
          onClick={() => {
            setIndex(3);
            setOpenDialog(true);
          }}
          variant="contained"
        >
          Change Password
        </Button>
      </Box>
    </Stack>
  );
}

export default MyAccount;
