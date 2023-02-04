import React from 'react';
import {
  Box,
  Button,
  Stack,
  colors,
  Divider,
  Card,
  useTheme,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import {
  DialogChangePassword,
  DialogEditName,
  DialogEditUsername,
} from './Dialog';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import useCheckAuth from 'src/hooks/useCheckAuth';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MyAccount() {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

  const { userData } = useCheckAuth();

  const handleCloseModal = (isOpen) => {
    setOpenDialog(!isOpen);
  };
  return (
    <Stack>
      <Stack width="100%" py={2} color={colors.grey[100]}>
        <Typography variant="h6">My Account</Typography>
      </Stack>
      <Card
        sx={{
          width: 680,
          borderRadius: 2,
          backgroundColor: theme.palette.grey[860],
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
              src={userData.avatarUrl}
            />
            {userData.fullname}
          </Stack>
        </Stack>
        <Box
          color={colors.grey[100]}
          m="auto"
          mb={4}
          p={2}
          backgroundColor={theme.palette.grey[850]}
          sx={{
            width: 620,
            borderRadius: 2,
            fontSize: '1.2rem',
          }}
        >
          <Stack justifyContent="space-between" direction="row" mb={1}>
            <Stack>
              <Typography
                fontSize={13}
                variant="inherit"
                color={colors.grey[400]}
              >
                Email:{' '}
              </Typography>
              <Typography variant="inherit" pl={1}>
                {userData.email}
              </Typography>
            </Stack>
            <Box>
              <Button
                onClick={() => {
                  setIndex(0);
                  setOpenDialog(true);
                }}
                height={20}
                variant="contained"
              >
                Edit
              </Button>
            </Box>
          </Stack>
          <Stack justifyContent="space-between" direction="row" mb={1}>
            <Stack>
              <Typography
                fontSize={13}
                variant="inherit"
                color={colors.grey[400]}
              >
                Full Name:{' '}
              </Typography>
              <Typography variant="inherit" pl={1}>
                {userData.fullname}
              </Typography>
            </Stack>
            <Box>
              <Button
                onClick={() => {
                  setIndex(1);
                  setOpenDialog(true);
                }}
                height={20}
                variant="contained"
              >
                Edit
              </Button>
            </Box>
          </Stack>

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <div>
              {(() => {
                switch (index) {
                  case 1:
                    return (
                      <DialogEditName
                        user={userData}
                        handleCloseModal={handleCloseModal}
                      />
                    );
                  case 0:
                    return (
                      <DialogEditUsername
                        user={userData}
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
