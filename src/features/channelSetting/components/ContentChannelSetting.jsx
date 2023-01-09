import React from 'react'
import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import Overview from './Overview';
import Permissions from './Permissions';
import Invites from './Invites';


function ContentChannelSetting(props) {
  const index = props.index;
  return (
    <Stack >
      <Box height="100%" py={3} px={5}>
        <div className="tabContent " hidden={index !== 0}>
          <Overview  />
        </div>
        <div className="tabContent " hidden={index !== 1}>
          <Permissions  />
        </div>
        <div className="tabContent " hidden={index !== 2}>
          <Invites  />
        </div>
      </Box>
    </Stack>
  )
}

export default ContentChannelSetting