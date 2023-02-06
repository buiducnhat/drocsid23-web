import React from 'react';
import {
  Accordion,
  colors,
  Stack,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Link,
  Avatar,
  Badge,
  useTheme,
  IconButton,
  Button,
  MenuItem,
  Menu,
  Fade,
  Box,
} from '@mui/material';
import {
  TagRounded as TagIcon,
  VolumeUpRounded as VolumeUpIcon,
  ExpandMoreRounded as ExpandMoreIcon,
  MicRounded as MicIcon,
  MicOffRounded as MicOffIcon,
  VideocamRounded as CameraIcon,
  VideocamOffRounded as CameraOffIcon,
  SettingsRounded as SettingsIcon,
  PersonAddAlt as AddPersonIcon,
  AddCircle as AddICon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { setOnCamera, setOnMicrophone } from 'src/features/app/appSlice';
import NiceModal from '@ebay/nice-modal-react';
import AddChannelDialog from 'src/features/home/components/AddChannelDialog';
import InviteDialog from 'src/features/home/components/InviteDialog';
import { Link as LinkDom } from 'react-router-dom';
import ServerSetting from 'src/features/serverSetting';
import UserSetting from 'src/features/userSetting/UserSetting';
import ChannelSettingDialog from './ChannelSettingDialog';
import { selectCurrentServer } from 'src/features/server/serverSlice';

const ChannelRow = ({ channel }) => {
  const activeChannel = useSelector((state) => state.servers.currentChannel);

  const currentServer = useSelector(selectCurrentServer);

  return (
    <Box
      borderRadius={1}
      p={0.5}
      sx={{
        '&:hover': {
          backgroundColor: colors.grey[700],
        },
        backgroundColor:
          channel._id === activeChannel._id ? colors.grey[800] : 'transparent',
      }}
      position="relative"
    >
      <Link
        component={LinkDom}
        underline="none"
        to={`/channels/${currentServer._id}/${channel._id}`}
      >
        <Stack direction="row" spacing={1} color={colors.grey[500]}>
          {channel.type === 'text' ? <TagIcon /> : <VolumeUpIcon />}
          <Typography variant="subtitle2" component="h4">
            {channel.name}
          </Typography>
        </Stack>
      </Link>
      <IconButton
        size="small"
        sx={{ position: 'absolute', top: 0, right: 0 }}
        onClick={() =>
          NiceModal.show(ChannelSettingDialog, { channelId: channel._id })
        }
      >
        <SettingsIcon fontSize="small" sx={{ color: 'Grey' }} />
      </IconButton>
    </Box>
  );
};

function ServerInfoColumn() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { userData } = useCheckAuth();

  const currentServer = useSelector((state) => state.servers.currentServer);
  const onMicrophone = useSelector((state) => state.app.onMicrophone);
  const onCamera = useSelector((state) => state.app.onCamera);

  //  modal setting server
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack height="100%" width="250px" p={1} backgroundColor={colors.grey[900]}>
      <Stack pb={1} pl={1}>
        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ color: colors.grey[300] }}
        >
          {currentServer.name}
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              NiceModal.show(InviteDialog);
            }}
          >
            <Stack width={190} direction="row" justifyContent="space-between">
              <Typography>Invite People</Typography>
              <AddPersonIcon fontSize="small" />
            </Stack>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              NiceModal.show(ServerSetting);
            }}
          >
            <Stack width={190} direction="row" justifyContent="space-between">
              <Typography>Server Settings</Typography>
              <SettingsIcon fontSize="small" />
            </Stack>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              NiceModal.show(AddChannelDialog);
            }}
          >
            <Stack width={190} direction="row" justifyContent="space-between">
              <Typography>Create Channel</Typography>
              <AddICon fontSize="small" />
            </Stack>
          </MenuItem>
        </Menu>
      </Stack>

      {[
        ['text channel', 'text'],
        ['voice channel', 'voice'],
      ].map(([title, type], key) => (
        <Accordion key={key} defaultExpanded={true} disableGutters={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: colors.grey[500] }} />}
          >
            <Typography
              color={colors.grey[500]}
              variant="subtitle1"
              component="h3"
            >
              {title.toUpperCase()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={0.25}>
              {currentServer?.channels
                ?.filter((item) => item.type === type)
                ?.map((item) => (
                  <ChannelRow key={item._id} channel={item} />
                ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}

      <Stack
        direction="row"
        spacing={1}
        m={-1}
        mt="auto"
        p={1}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <Stack
          direction="row"
          p={0.5}
          spacing={1}
          borderRadius={1}
          sx={{
            ':hover': {
              cursor: 'pointer',
              backgroundColor: colors.grey[800],
            },
          }}
        >
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            color="success"
            overlap="circular"
            badgeContent=" "
            variant="dot"
          >
            <Avatar
              alt="personal avatar"
              src={userData?.avatarUrl}
              sx={{ width: 36, height: 36 }}
            />
          </Badge>
          <Stack spacing={0.25}>
            <Typography variant="caption" fontWeight="bold">
              {userData?.fullname?.split(' ')[0]}
            </Typography>
            <Typography variant="caption" color="lightgray">
              #{userData?._id.slice(0, 6)}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" p={0.5} spacing={0.5}>
          <IconButton
            color="default"
            size="small"
            onClick={() => dispatch(setOnMicrophone(!onMicrophone))}
          >
            {onMicrophone ? <MicIcon /> : <MicOffIcon />}
          </IconButton>

          <IconButton
            color="default"
            size="small"
            onClick={() => dispatch(setOnCamera(!onCamera))}
          >
            {onCamera ? <CameraIcon /> : <CameraOffIcon />}
          </IconButton>
          <IconButton
            onClick={() => {
              NiceModal.show(UserSetting);
            }}
            color="default"
            size="small"
          >
            <SettingsIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ServerInfoColumn;
