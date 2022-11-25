import React from 'react';
import {
  Accordion,
  colors,
  Divider,
  Stack,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material';
import {
  TagRounded as TagIcon,
  VolumeUpRounded as VolumeUpIcon,
  ExpandMoreRounded as ExpandMoreIcon,
} from '@mui/icons-material';

const channels = [
  {
    id: 1,
    name: 'General',
    type: 'text',
  },
  {
    id: 2,
    name: 'Learning',
    type: 'text',
  },
  {
    id: 3,
    name: 'Voice main',
    type: 'voice',
  },
  {
    id: 4,
    name: 'Gaming',
    type: 'voice',
  },
];

const ChannelRow = ({ channel }) => {
  return (
    <Link
      key={channel.id}
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
  return (
    <Stack height="100%" width="250px" p={1} backgroundColor={colors.grey[900]}>
      <Typography variant="h6" component="h1">
        Name Server
      </Typography>

      <Divider sx={{ marginY: 1 }} />

      {[
        ['text channel', 'text'],
        ['voice channel', 'voice'],
      ].map(([title, type]) => (
        <Accordion defaultExpanded={true} disableGutters={true}>
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
              {channels
                .filter((channel) => channel.type === type)
                .map((channel) => (
                  <ChannelRow key={channel.id} channel={channel} />
                ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}

export default ServerInfoColumn;
