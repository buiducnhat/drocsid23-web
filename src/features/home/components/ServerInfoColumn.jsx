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
import { useSelector } from 'react-redux';

const ChannelRow = ({ channel }) => {
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

  const currentServer = useSelector((state) => state.servers.currentServer);

  const [offMic, setOffMic] = React.useState(false);
  const [offHeadphone, setOffHeadphone] = React.useState(false);

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
              src="https://material-ui.com/static/images/avatar/3.jpg"
              sx={{ width: 36, height: 36 }}
            />
          </Badge>
          <Typography variant="subtitle2" fontWeight="bold">
            group23
          </Typography>
        </Stack>

        <Stack direction="row" p={0.5} spacing={0.5}>
          <IconButton
            color="default"
            size="small"
            onClick={() => setOffMic(!offMic)}
          >
            {offMic ? <MicOffIcon /> : <MicIcon />}
          </IconButton>

          <IconButton
            color="default"
            size="small"
            onClick={() => setOffHeadphone(!offHeadphone)}
          >
            {offHeadphone ? <HeadphoneOffIcon /> : <HeadphoneIcon />}
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
