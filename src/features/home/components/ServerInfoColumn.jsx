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
} from '@mui/material';
import {
  TagRounded as TagIcon,
  VolumeUpRounded as VolumeUpIcon,
  ExpandMoreRounded as ExpandMoreIcon,
  MicRounded as MicIcon,
  MicOffRounded as MicOffIcon,
  HeadsetMicRounded as HeadphoneIcon,
  HeadsetOffRounded as HeadphoneOffIcon,
  SettingsRounded as SettingsIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelInfoAction } from 'src/features/server/serverSlice';
import useCheckAuth from 'src/hooks/useCheckAuth';
import { setOnMicrophone, setOnVolume } from 'src/features/app/appSlice';

const ChannelRow = ({ channel }) => {
  const dispatch = useDispatch();

  return (
    <Link
      underline="none"
      href="#"
      borderRadius={1}
      p={0.5}
      sx={{
        '&:hover': {
          backgroundColor: colors.grey[800],
        },
      }}
      onClick={(e) => {
        e.preventDefault();
        dispatch(getChannelInfoAction(channel._id));
      }}
    >
      <Stack direction="row" spacing={1} color={colors.grey[500]}>
        {channel.type === 'text' ? <TagIcon /> : <VolumeUpIcon />}
        <Typography variant="subtitle2" component="h4">
          {channel.name}
        </Typography>
      </Stack>
    </Link>
  );
};

function ServerInfoColumn() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { userData } = useCheckAuth();

  const currentServer = useSelector((state) => state.servers.currentServer);
  const onMicrophone = useSelector((state) => state.app.onMicrophone);
  const onVolume = useSelector((state) => state.app.onVolume);

  return (
    <Stack height="100%" width="250px" p={1} backgroundColor={colors.grey[900]}>
      <Typography variant="h6" component="h1">
        Name Server
      </Typography>

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
              {currentServer?.listChannel
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
            onClick={() => dispatch(setOnVolume(!onVolume))}
          >
            {onVolume ? <HeadphoneIcon /> : <HeadphoneOffIcon />}
          </IconButton>

          <IconButton color="default" size="small">
            <SettingsIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ServerInfoColumn;
