import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, colors, IconButton } from '@mui/material';
import Profiles from './components/Profile';
import MyAccount from './components/MyAccount';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Stack } from '@mui/system';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserSetting() {
  const user = {
    id: 1,
    username: 'TH',
    email: 'henry@gmail.com',
    first_name: 'Henry',
    last_name: 'thierry',
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              <Typography variant="h7" px={3}>
                USER SETTINGS{' '}
              </Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
                orientation="vertical"
                variant="scrollable"
              >
                <Tab
                  sx={{
                    color: colors.grey[600],
                    '&:hover': {
                      backgroundColor: colors.grey[800],
                    },
                  }}
                  label="My Account"
                  {...a11yProps(0)}
                >
                  <Box></Box>
                </Tab>
                <Tab
                  sx={{
                    color: colors.grey[600],
                    '&:hover': {
                      backgroundColor: colors.grey[800],
                    },
                  }}
                  label="Profile"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{
                    color: colors.grey[600],
                    '&:hover': {
                      backgroundColor: colors.grey[800],
                    },
                  }}
                  label="Log Out"
                  {...a11yProps(2)}
                />
              </Tabs>
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
          <Box height="100%">
            <TabPanel value={value} index={0}>
              <MyAccount user={user} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Profiles user={user} servers={servers} />
            </TabPanel>
            <TabPanel value={value} index={2}></TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
