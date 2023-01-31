import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MyAccount from './MyAccount';
import Profiles from './Profile';

const ContentSetting = (props) => {
  const index = props.index;
  const user = {
    id: 1,
    username: 'Titi',
    email: 'henry@gmail.com',
    first_name: 'Henry',
    last_name: 'Thierry',
    avatar:
      'https://i0.wp.com/www.sportsbignews.com/wp-content/uploads/2021/06/henry-hd-best-pl.jpg?fit=640%2C460&ssl=1',
  };
  const servers = [1, 2, 3, 4, 5].map((id) => ({
    id,
    name: 'Server ' + id,
    avatar:
      Math.random() < 0.5
        ? 'https://material-ui.com/static/images/avatar/1.jpg'
        : '',
  }));
  return (
    <Stack>
      <Box height="100%" py={3} px={5}>
        <div className="tabContent " hidden={index !== 0}>
          <MyAccount user={user} />
        </div>
        <div className="tabContent " hidden={index !== 1}>
          <Profiles user={user} servers={servers} />
        </div>
      </Box>
    </Stack>
  );
};

export default ContentSetting;
