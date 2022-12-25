import * as React from 'react';
import {
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  colors,
  Avatar,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      sx={{ width: '100%' }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function ServerSettingDialog({ close }) {
  const [currentTab, setCurrentTab] = React.useState(0);

  return (
    <Container>
      <DialogContent>
        <DialogTitle>Server settings</DialogTitle>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: colors.grey[900],
            display: 'flex',
            borderRadius: 1,
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={currentTab}
            onChange={(event, newTab) => {
              setCurrentTab(newTab);
            }}
            aria-label="Vertical tabs"
            sx={{ borderRight: 1, borderColor: 'divider', width: 250 }}
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Roles" {...a11yProps(1)} />
            <Tab label="Members" {...a11yProps(2)} />
          </Tabs>

          <TabPanel value={currentTab} index={0}>
            <Typography variant="h5" component="h2" mb={4}>
              Overview
            </Typography>
            <Box display="flex">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  marginRight: 4,
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
                onClick={() => alert('Change avatar')}
              />
              <TextField size="medium" label="Server name" />
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Typography variant="h5" component="h2">
              Roles
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              color={'GrayText'}
              mb={4}
            >
              Use roles to manage permissions for your server members.
            </Typography>

            <Box display="flex" sx={{ width: '100%' }}>
              <FormControl sx={{ mr: 1, width: '50ch' }}>
                <InputLabel htmlFor="search-role-input">Search role</InputLabel>
                <OutlinedInput
                  size="medium"
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  label="Search role"
                />
              </FormControl>
              <Button variant="contained">Create role</Button>
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </DialogContent>
    </Container>
  );
}
