import React, { useState } from 'react';
import {
  Box,
  Stack,
  Popover,
  Typography,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import * as colors from '@mui/material/colors';
import PeopleAltTwoTone from '@mui/icons-material/PeopleAltTwoTone';
import NiceModal from '@ebay/nice-modal-react';
import { useDispatch, useSelector } from 'react-redux';

import ServerSettingDialog from './ServerSettingDialog';
import {
  getServerInfoAction,
  selectCurrentServer,
} from 'src/features/server/serverSlice';

function ChatAvatar({ isDirect, serverId, name, imgUrl }) {
  const theme = useTheme();

  const dispatch = useDispatch();

  const currentServer = useSelector(selectCurrentServer);
  const isSelected = currentServer._id === serverId;

  const [isHover, setIsHover] = useState(false);
  const [contextMenu, setContextMenu] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Stack
      width="100%"
      direction="row"
      spacing={1}
      pr={2}
      justifyContent="space-between"
      alignItems="center"
      onClick={() => {
        dispatch(getServerInfoAction(serverId));
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setIsHover(false);
        setContextMenu(
          contextMenu === null
            ? {
                mouseX: e.clientX + 2,
                mouseY: e.clientY - 6,
              }
            : null
        );
      }}
    >
      <Menu
        open={contextMenu !== null}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem>Access</MenuItem>
        <MenuItem
          onClick={() => {
            // openModal('serverSettings', {
            //   fullScreen: true,
            //   children: <ServerSettingDialog close={closeModal} />,
            // });
            NiceModal.show(ServerSettingDialog);
          }}
        >
          Server Settings
        </MenuItem>
      </Menu>
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
        onMouseEnter={(e) => {
          setIsHover(true);
          setAnchorEl(e.currentTarget);
        }}
        onMouseLeave={() => {
          setIsHover(false);
          setAnchorEl(null);
        }}
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
            backgroundColor: theme.palette.primary.main,
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

      <Popover
        sx={{
          pointerEvents: 'none',
          ml: 1,
        }}
        open={isHover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        onClose={() => {
          setIsHover(false);
          setAnchorEl(null);
        }}
      >
        <Typography sx={{ p: 1 }} variant="body1" component="p">
          {name}
        </Typography>
      </Popover>
    </Stack>
  );
}

export default ChatAvatar;
