import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MyAccount from './MyAccount';
import Profiles from './Profile';

const ContentSetting = (props) => {
  const index = props.index;
  return (
    <Stack>
      <Box height="100%" py={3} px={5}>
        <div className="tabContent " hidden={index !== 0}>
          <MyAccount />
        </div>
        <div className="tabContent " hidden={index !== 1}>
          <Profiles />
        </div>
      </Box>
    </Stack>
  );
};

export default ContentSetting;
