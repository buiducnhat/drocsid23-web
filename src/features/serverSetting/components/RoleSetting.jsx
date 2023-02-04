import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  colors,
  FormControl,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  OutlinedInput,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import * as React from 'react';

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

const RoleSetting = () => {
  return (
    <>
      <Stack>
        <Typography variant="h5" component="h2">
          Roles
        </Typography>
        <Typography variant="subtitle1" component="p" color={'GrayText'} mb={4}>
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
          <Button variant="outlined">Create role</Button>
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
      </Stack>
    </>
  );
};

export default RoleSetting;
