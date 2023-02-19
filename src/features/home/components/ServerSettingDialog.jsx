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
  Dialog,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createRoleAction,
  deleteRoleAction,
  removeUserFromServerAction,
  selectCurrentServer,
  updateRoleAction,
  updateServerAction,
} from 'src/features/server/serverSlice';
import { SERVER_POLICY, SERVER_POLICY_NAMES } from 'src/app/constants';
import UserRoleSettingDialog from './UserRoleSettingDialog';

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

const ServerSettingDialog = NiceModal.create(() => {
  const modal = useModal();
  const dispatch = useDispatch();
  const currentServer = useSelector(selectCurrentServer);

  const [currentTab, setCurrentTab] = React.useState(0);
  const [serverName, setServerName] = React.useState(currentServer.name);
  const [addRoleName, setAddRoleName] = React.useState('');

  const hasManageServerPolicy =
    currentServer.policies.indexOf(SERVER_POLICY.MANAGE_SERVER) !== -1;
  const hasManageRolePolicy =
    currentServer.policies.indexOf(SERVER_POLICY.MANAGE_ROLE) !== -1;

  const updateServer = (data) => {
    dispatch(updateServerAction({ id: currentServer._id, data }));
  };

  React.useEffect(() => {
    setServerName(currentServer.name);
  }, [currentServer.name]);

  return (
    <Dialog fullScreen {...muiDialogV5(modal)}>
      <Container sx={{ position: 'relative' }}>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            top: 16,
            right: 48,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={() => modal.hide()}
        >
          <CloseIcon />
        </IconButton>

        <DialogTitle>Server settings</DialogTitle>
        <DialogContent>
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
                  src={`https://ui-avatars.com/api/?name=${currentServer.name
                    .split(' ')
                    .join()}&background=random`}
                />
                <Stack direction="column" spacing={1}>
                  <TextField
                    size="small"
                    label="Server name"
                    value={serverName}
                    onChange={(event) => setServerName(event.target.value)}
                    disabled={!hasManageServerPolicy}
                  />
                  {hasManageServerPolicy && (
                    <Button
                      variant="contained"
                      disabled={serverName === currentServer.name}
                      onClick={() => updateServer({ name: serverName })}
                    >
                      Save
                    </Button>
                  )}
                </Stack>
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

              {hasManageRolePolicy && (
                <Box display="flex" mb={2} sx={{ width: '100%' }}>
                  <FormControl size="small" sx={{ mr: 1, width: '50ch' }}>
                    <InputLabel>Role name</InputLabel>
                    <OutlinedInput
                      label="Search role"
                      value={addRoleName}
                      onChange={(event) => setAddRoleName(event.target.value)}
                    />
                  </FormControl>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      dispatch(
                        createRoleAction({
                          serverId: currentServer._id,
                          data: {
                            name: addRoleName,
                            rolePolicies: [],
                            serverId: currentServer._id,
                          },
                        })
                      )
                    }
                  >
                    Create role
                  </Button>
                </Box>
              )}

              {currentServer.roles.map((role, index) => (
                <Accordion
                  key={index}
                  sx={{ backgroundColor: colors.grey[900] }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel2"
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ width: '45%', flexShrink: 0 }}
                    >
                      {role.name}
                    </Typography>
                    <PersonIcon sx={{ color: 'text.secondary', mr: 1 }} />
                    <Typography sx={{ color: 'text.secondary', width: '45%' }}>
                      {role?.users.length}
                    </Typography>
                    {role.name !== 'everyone' &&
                      role.name !== 'admin' &&
                      hasManageRolePolicy && (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                              deleteRoleAction({
                                serverId: currentServer._id,
                                roleId: role._id,
                              })
                            );
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                  </AccordionSummary>

                  <AccordionDetails>
                    <Stack direction="row" spacing={2} px={2}>
                      <Tooltip title="Setting role">
                        <Avatar
                          sizes="50px"
                          sx={{
                            width: 48,
                            height: 48,
                            cursor: 'pointer',
                          }}
                          onClick={() =>
                            NiceModal.show(UserRoleSettingDialog, {
                              roleId: role._id,
                              hasManageRolePolicy,
                            })
                          }
                        >
                          <SettingsIcon />
                        </Avatar>
                      </Tooltip>
                      {role?.users?.map((_user) => {
                        const user = currentServer.members.find(
                          (u) => u._id === _user._id
                        );

                        return (
                          <Tooltip key={user._id} title={user?.email}>
                            <Avatar
                              sizes="50px"
                              alt={`${user?.fullname}`}
                              sx={{ width: 48, height: 48 }}
                              src={`https://i.pravatar.cc/150?u=${user?._id}`}
                            />
                          </Tooltip>
                        );
                      })}
                    </Stack>
                    <List>
                      {Object.entries(SERVER_POLICY_NAMES).map(
                        ([policy, { title, description }]) => (
                          <ListItem key={policy}>
                            <ListItemText
                              primary={title}
                              secondary={description}
                            />
                            <ListItemSecondaryAction>
                              <Switch
                                edge="end"
                                disabled={!hasManageRolePolicy}
                                checked={role?.rolePolicies?.includes(+policy)}
                                onChange={(event) => {
                                  let data = {
                                    rolePolicies: [...role.rolePolicies],
                                  };
                                  if (event.target.checked) {
                                    data.rolePolicies.push(+policy);
                                  } else {
                                    data.rolePolicies =
                                      data.rolePolicies.filter(
                                        (p) => p !== +policy
                                      );
                                  }

                                  dispatch(
                                    updateRoleAction({
                                      serverId: currentServer._id,
                                      roleId: role._id,
                                      data,
                                    })
                                  );
                                }}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        )
                      )}
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

              <List>
                {currentServer.members.map((user, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar
                        alt={user?.fullname}
                        src={`https://i.pravatar.cc/150?u=${user._id}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user?.fullname}
                      secondary={user?.email}
                    />
                    {hasManageServerPolicy && (
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            dispatch(
                              removeUserFromServerAction({
                                serverId: currentServer._id,
                                userId: user._id,
                              })
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </Box>
        </DialogContent>
      </Container>
    </Dialog>
  );
});

export default ServerSettingDialog;
