import React from 'react';
import {
  Stack,
  colors,
  Typography,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Menu,
  Avatar,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CheckIcon from '@mui/icons-material/Check';
import TokenIcon from '@mui/icons-material/Token';

const roles = [
  { name: 'VIP' },
  { name: 'SVIP' },
  { name: 'VVIP' },
  { name: 'Master' },
  { name: 'Member' },
];
const members = [
  {
    id: 2,
    username: 'NamNV',
    avatar:
      'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
  },
  {
    id: 3,
    username: 'trungAA',
    avatar:
      'https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg',
  },
  {
    id: 4,
    username: 'HangAS',
    avatar:
      'https://www.creativefabrica.com/wp-content/uploads/2021/04/11/Woman-Avatar-Icon-Vector-Graphics-10677522-1-580x387.jpg',
  },
  {
    id: 5,
    username: 'NghiaTV',
    avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
  },
];
const permissions = [
  {
    title: 'Manage Channel',
    description:
      "Allows members to change this channel 's name. They can also delete the channel.",
  },
  {
    title: 'Create Invite',
    description:
      'Allows members to invite new people to this server via a direct invite link to this channel. The recipient will automatically join the voice channel if they have permission to connect.',
  },
  {
    title: 'Send Messages',
    description: 'Allows members to send messages in this channel.',
  },
  {
    title: 'Manage Messages',
    description:
      'Allows members to delete messages by other members or pin any message in this channel.',
  },
  // permissions voice channel
  {
    title: 'Connect',
    description:
      'Allows members to join this channel and hear others. Disabing this and the "View Channel" permissions for @everyone will make this channel private.',
  },
  {
    title: 'Speak',
    description:
      "Allows members to talk in this voice channel. If this permission is disabled, members are default muted until somebody with the 'Mute Members' permissions unmutes them",
  },
  {
    title: 'Video',
    description:
      'Allows members to share their video, Screen Share or stream a game in this voice channel',
  },
  {
    title: 'Mute Members',
    description:
      'Allows members to mute other members in this voice channel for everyone.',
  },
  {
    title: 'Deafen Members',
    description:
      "Allows members to deafen other members in this voice channel, which means they won't be able to speak or hear others.",
  },
];
const Permission = () => {
  const [alignment, setAlignment] = React.useState('default');
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  return (
    <>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        size="small"
        sx={{ border: 1, borderColor: colors.grey[900], height: 32 }}
      >
        <ToggleButton
          sx={{
            color: colors.red[500],
            '&.Mui-selected': {
              backgroundColor: colors.red[800],
              color: colors.grey[200],
              '&:hover': {
                backgroundColor: colors.red[800],
              },
            },
          }}
          value="no"
          aria-label="left aligned"
        >
          <ClearIcon />
        </ToggleButton>
        <ToggleButton
          sx={{
            color: colors.grey[200],
            '&.Mui-selected': {
              backgroundColor: colors.grey[600],
              color: colors.grey[200],
              '&:hover': {
                backgroundColor: colors.grey[600],
              },
            },
          }}
          value="default"
          aria-label="centered"
        >
          <HorizontalRuleIcon />
        </ToggleButton>
        <ToggleButton
          sx={{
            color: colors.green[800],
            '&.Mui-selected': {
              backgroundColor: colors.green[800],
              color: colors.grey[200],
              '&:hover': {
                backgroundColor: colors.green[800],
              },
            },
          }}
          value="yes"
          aria-label="right aligned"
        >
          <CheckIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default function AdvancedPermissions() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeRoleMember, setActiveRoleMember] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleAddRoleMember = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [role, setRole] = React.useState([]);
  const handleAddRole = (data) => {
    handleClose();
    if (!role.includes(data)) {
      setRole([...role, data]);
    }
  };

  const [getMemberID, setGetMemberID] = React.useState([]);
  const handleGetMember = (id) => {
    if (!getMemberID.includes(id)) {
      setGetMemberID([...getMemberID, id]);
    }
    handleClose();
  };
  function filterMembersById(members, ids) {
    return members.filter((member) => ids.includes(member.id));
  }
  const newMembers = filterMembersById(members, getMemberID);
  return (
    <>
      <Stack width="100%" color={colors.grey[100]}>
        <Typography variant="h6">Advanced Permissions</Typography>
      </Stack>
      <Stack pt={3} flexDirection="row">
        <Box className="addRole" width={300} mr={3}>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            py={0.3}
            onClick={handleAddRoleMember}
          >
            <div style={{ cursor: 'pointer' }} fontSize={14}>
              Roles/Members
            </div>
            <AddCircleOutlineIcon fontSize="small"></AddCircleOutlineIcon>
          </Stack>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: colors.grey[900],
              },
            }}
          >
            <Stack
              bgcolor={colors.grey[900]}
              width={200}
              sx={{ maxHeight: 250, overflow: 'auto', color: colors.grey[200] }}
            >
              <Typography
                sx={{
                  padding: 0.5,
                  paddingX: 1,
                  backgroundColor: colors.grey[800],
                }}
                fontSize={14}
              >
                ROLES
              </Typography>
              {roles.map((role, index) => (
                <Stack
                  key={index}
                  p={0.5}
                  direction="row"
                  alignItems="center"
                  sx={{
                    '&:hover': {
                      backgroundColor: colors.grey[700],
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => {
                    handleAddRole(role.name);
                  }}
                >
                  <TokenIcon fontSize="small" />
                  <Typography ml={1}>{role.name}</Typography>
                </Stack>
              ))}
              <Typography
                sx={{
                  padding: 0.5,
                  paddingX: 1,
                  backgroundColor: colors.grey[800],
                }}
                fontSize={14}
              >
                MEMBERS
              </Typography>
              {members.map((member, index) => (
                <Stack
                  p={1}
                  key={index}
                  direction="row"
                  alignItems="center"
                  sx={{
                    '&:hover': {
                      backgroundColor: colors.grey[700],
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => {
                    handleGetMember(member.id);
                  }}
                >
                  <Avatar sx={{ width: 24, height: 24 }} src={member.avatar} />
                  <Typography ml={1}>{member.username}</Typography>
                </Stack>
              ))}
            </Stack>
          </Menu>
          <Divider
            sx={{ backgroundColor: colors.grey[700], marginBottom: 0.5 }}
          />
          {role.map((r, index) => (
            <Stack
              key={index}
              height={32}
              bgcolor={
                activeRoleMember === index ? colors.grey[900] : colors.grey[800]
              }
              borderRadius={1.5}
              pl={1.5}
              flexDirection="row"
              alignItems="center"
              color={colors.grey[200]}
              my={0.2}
              onClick={() => {
                setActiveRoleMember(index);
              }}
              sx={{
                '&:hover': {
                  backgroundColor: colors.grey[900],
                  cursor: 'pointer',
                },
              }}
            >
              {r}
            </Stack>
          ))}
          {newMembers.map((member, index) => (
            <Stack
              key={member.id}
              height={32}
              bgcolor={
                activeRoleMember === index + roles.length
                  ? colors.grey[900]
                  : colors.grey[800]
              }
              borderRadius={1.5}
              pl={1.5}
              flexDirection="row"
              alignItems="center"
              color={colors.grey[200]}
              my={0.2}
              onClick={() => {
                setActiveRoleMember(index + roles.length);
              }}
              sx={{
                '&:hover': {
                  backgroundColor: colors.grey[900],
                  cursor: 'pointer',
                },
              }}
            >
              <Avatar sx={{ width: 24, height: 24 }} src={member.avatar} />
              <Typography ml={1}>{member.username}</Typography>
            </Stack>
          ))}
        </Box>
        <Box className="channelPermission">
          <Typography mb={2} fontSize={16}>
            General Channel Permissions
          </Typography>
          {permissions.map((permission, index) => (
            <Stack key={index}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                pr={2}
              >
                <Typography color={colors.grey[200]} variant="subtitle1">
                  {permission.title}
                </Typography>
                <Permission></Permission>
              </Stack>
              <Typography fontSize={13}>{permission.description}</Typography>
              <Stack my={2}>
                <Divider color={colors.grey[700]} />
              </Stack>
            </Stack>
          ))}
        </Box>
      </Stack>
    </>
  );
}
