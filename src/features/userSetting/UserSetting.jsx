import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, colors, IconButton, Divider, Button } from '@mui/material';
import Profiles from './components/Profile';
import MyAccount from './components/MyAccount';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Stack } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';

export default function UserSetting() {
  const user = {
    id: 1,
    username: 'Titi',
    email: 'henry@gmail.com',
    first_name: 'Henry',
    last_name: 'Thierry',
    avatar:
      'https://i0.wp.com/www.sportsbignews.com/wp-content/uploads/2021/06/henry-hd-best-pl.jpg?fit=640%2C460&ssl=1',
  };
  const servers = [1, 2, 3, 4, 5].map((id) => ({
    id,
    name: 'Server ' + id,
    avatar:
      Math.random() < 0.5
        ? 'https://material-ui.com/static/images/avatar/1.jpg'
        : '',
  }));

  const styleTab = {
    height: 30,
    mr: 0.5,
    mt: 0.3,
    borderRadius: 1,
    color: colors.grey[500],
    '&:hover': {
      backgroundColor: colors.grey[800],
      color: colors.grey[200],
    },
    cursor: 'pointer',
  };

  const [index, setIndex] = React.useState(0);
  return (
    <Box>
      <Grid direction="row" container height="100vh">
        <Grid
          item
          xs={3.5}
          color={colors.grey[100]}
          backgroundColor={colors.grey[900]}
        >
          <Box
            height="100%"
            py={6}
            sx={{ display: 'flex', flexDirection: 'row-reverse' }}
          >
            <Box>
              <Typography variant="h7" pr={6}>
                USER SETTINGS
              </Typography>
              <Stack className="tabList">
                <Stack
                  justifyContent="center"
                  sx={styleTab}
                  bgcolor={index === 0 ? colors.grey[800] : ''}
                  color={colors.grey[400]}
                  onClick={() => setIndex(0)}
                >
                  <Typography
                    color={index === 0 ? colors.grey[100] : ''}
                    px={2}
                  >
                    My Account
                  </Typography>
                </Stack>
                <Stack
                  justifyContent="center"
                  sx={styleTab}
                  bgcolor={index === 1 ? colors.grey[800] : ''}
                  onClick={() => setIndex(1)}
                >
                  <Typography
                    color={index === 1 ? colors.grey[100] : ''}
                    px={2}
                  >
                    My Profiles
                  </Typography>
                </Stack>
                <Box py={1}>
                  <Divider color={colors.grey[400]} />
                </Box>
                <Button
                  justifyContent="center"
                  sx={styleTab}
                  bgcolor={index === 2 ? colors.grey[800] : ''}
                  direction="row"
                >
                  <LogoutIcon />
                  <Typography
                    color={index === 2 ? colors.grey[100] : ''}
                    px={2}
                  >
                    Log Out
                  </Typography>
                </Button>
              </Stack>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={8.5}
          color={colors.grey[100]}
          backgroundColor={colors.grey[800]}
        >
          <Stack
            sx={{ color: colors.grey[400] }}
            justifyContent="center"
            pl={94}
            pt={6}
            position="absolute"
            align="center"
          >
            <IconButton sx={{ color: colors.grey[400] }}>
              <HighlightOffIcon fontSize="large" />
            </IconButton>
            <Typography> ESC </Typography>
          </Stack>
          <Box height="100%" p={3}>
            <div className="tabContent " hidden={index !== 0}>
              <MyAccount user={user} />
            </div>
            <div className="tabContent " hidden={index !== 1}>
              <Profiles user={user} servers={servers} />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
