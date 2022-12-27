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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
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

const _mockRoles_ = [
  {
    name: 'admin',
    countMember: 3,
    permissions: [
      {
        name: 'View channels',
        value: true,
        description:
          'Allows members to view and read messages in text channels and see voice channels.',
      },
      {
        name: 'Send messages',
        value: true,
        description: 'Allows members to send messages in text channels.',
      },
      {
        name: 'Manage messages',
        value: false,
        description:
          'Allows members to delete and edit other members messages.',
      },
      {
        name: 'Manage roles',
        value: false,
        description: 'Allows members to create, edit and delete roles.',
      },
      {
        name: 'Manage channels',
        value: false,
        description: 'Allows members to create, edit and delete channels.',
      },
      {
        name: 'Manage server',
        value: false,
        description: 'Allows members to edit server settings.',
      },
    ],
  },
  {
    name: 'moderator',
    countMember: 15,
    permissions: [
      {
        name: 'View channels',
        value: true,
        description:
          'Allows members to view and read messages in text channels and see voice channels.',
      },
      {
        name: 'Send messages',
        value: true,
        description: 'Allows members to send messages in text channels.',
      },
      {
        name: 'Manage messages',
        value: false,
        description:
          'Allows members to delete and edit other members messages.',
      },
      {
        name: 'Manage roles',
        value: false,
        description: 'Allows members to create, edit and delete roles.',
      },
      {
        name: 'Manage channels',
        value: false,
        description: 'Allows members to create, edit and delete channels.',
      },
      {
        name: 'Manage server',
        value: false,
        description: 'Allows members to edit server settings.',
      },
    ],
  },
  {
    name: 'member',
    countMember: 140,
    permissions: [
      {
        name: 'View channels',
        value: true,
        description:
          'Allows members to view and read messages in text channels and see voice channels.',
      },
      {
        name: 'Send messages',
        value: true,
        description: 'Allows members to send messages in text channels.',
      },
      {
        name: 'Manage messages',
        value: false,
        description:
          'Allows members to delete and edit other members messages.',
      },
      {
        name: 'Manage roles',
        value: false,
        description: 'Allows members to create, edit and delete roles.',
      },
      {
        name: 'Manage channels',
        value: false,
        description: 'Allows members to create, edit and delete channels.',
      },
      {
        name: 'Manage server',
        value: false,
        description: 'Allows members to edit server settings.',
      },
    ],
  },
];

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

export default function ServerSettingDialog({ close }) {
  const [currentTab, setCurrentTab] = React.useState(0);

  return (
    <Container sx={{ position: 'relative' }}>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: 'absolute',
          top: 36,
          right: 48,

          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

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
            sx={{ borderRight: 1, borderColor: 'divider', width: 350 }}
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
              <TextField size="small" label="Server name" />
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

            <Box display="flex" mb={2} sx={{ width: '100%' }}>
              <FormControl size="small" sx={{ mr: 1, width: '50ch' }}>
                <InputLabel>Search role</InputLabel>
                <OutlinedInput
                  endAdornment={
                    <InputAdornment position="end" sx={{ color: 'GrayText' }}>
                      <SearchIcon />
                    </InputAdornment>
                  }
                  label="Search role"
                />
              </FormControl>
              <Button variant="contained">Create role</Button>
            </Box>

            {_mockRoles_.map((role, index) => (
              <Accordion key={index} sx={{ backgroundColor: colors.grey[900] }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel2"
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ width: '50%', flexShrink: 0 }}
                  >
                    {role.name}
                  </Typography>
                  <PersonIcon sx={{ color: 'text.secondary', mr: 1 }} />
                  <Typography sx={{ color: 'text.secondary' }}>
                    {role.countMember}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <List>
                    {role.permissions.map((permission, index2) => (
                      <ListItem key={index2}>
                        <ListItemText
                          primary={permission.name}
                          secondary={permission.description}
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            edge="end"
                            checked={permission.value}
                            value={permission.value}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            <Typography variant="h5" component="h2">
              Members
            </Typography>
            <Typography
              variant="subtitle1"
              component="p"
              color={'GrayText'}
              mb={4}
            >
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
          </TabPanel>
        </Box>
      </DialogContent>
    </Container>
  );
}
