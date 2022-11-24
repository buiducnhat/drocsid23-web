import React, { useState } from 'react';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import * as colors from '@mui/material/colors';
import PeopleAltTwoTone from '@mui/icons-material/PeopleAltTwoTone';

function ChatAvatar({ isDirect, isSelected, name, imgUrl, ...rest }) {
  const theme = useTheme();

  const [isHover, setIsHover] = useState(false);

  return (
    <Tooltip title={name} placement="right">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          height={isSelected ? '40px' : '20px'}
          width="3px"
          sx={{
            bgcolor: isSelected || isHover ? 'white' : 'transparent',
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          }}
        ></Box>

        <Box
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          height={48}
          width={48}
          borderRadius={isSelected ? '35%' : '50%'}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor={
            theme.palette.mode === 'light' ? colors.grey[300] : colors.grey[800]
          }
          sx={{
            backgroundImage: imgUrl ? `url(${imgUrl})` : '',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            ':hover': {
              cursor: 'pointer',
              borderRadius: '35%',
              backgroundColor: colors.indigo[500],
              color: theme.palette.common.white,
            },
          }}
        >
          {isDirect ? (
            <PeopleAltTwoTone />
          ) : imgUrl ? null : (
            <Typography variant="h5" component="h2">
              {name ? name[0]?.toUpperCase() : ''}
            </Typography>
          )}
        </Box>
      </Box>
    </Tooltip>
  );
}

export default ChatAvatar;
