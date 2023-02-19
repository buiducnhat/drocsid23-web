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
  deleteServerAction,
  getServerInfoAction,
  selectCurrentServer,
} from 'src/features/server/serverSlice';
import { useNavigate } from 'react-router';
import AddChannelDialog from './AddChannelDialog';
import CreateInvitationDialog from './CreateInvitationDialog';
import { SERVER_POLICY } from 'src/app/constants';

function ServerItem({ isDirect, serverId, name, imgUrl }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentServer = useSelector(selectCurrentServer);
  const isSelected = currentServer._id === serverId;

  const [isHover, setIsHover] = useState(false);
  const [contextMenu, setContextMenu] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const hasManageServerPolicy = currentServer?.policies?.includes(
    SERVER_POLICY.MANAGE_SERVER
  );
  const hasManageChannelPolicy = currentServer?.policies?.includes(
    SERVER_POLICY.MANAGE_CHANNEL
  );
  const hasInvitationPolicy = currentServer?.policies?.includes(
    SERVER_POLICY.INVITE
  );

  return (
    <Stack
      width="100%"
      direction="row"
      spacing={1}
      pr={2}
      justifyContent="space-between"
      alignItems="center"
      onClick={() => {
        navigate(`/channels/${serverId}`);
      }}
      onContextMenu={(e) => {
        e.stopPropagation();
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
        <MenuItem
          onClick={() => {
            dispatch(getServerInfoAction(serverId));
            NiceModal.show(ServerSettingDialog);
          }}
        >
          Server Settings
        </MenuItem>
        {hasInvitationPolicy && (
          <MenuItem
            onClick={() => {
              NiceModal.show(CreateInvitationDialog, { serverId });
            }}
          >
            Create invitation
          </MenuItem>
        )}
        {hasManageChannelPolicy && (
          <MenuItem
            onClick={() => {
              dispatch(getServerInfoAction(serverId));
              NiceModal.show(AddChannelDialog, { serverId });
            }}
          >
            Add channel
          </MenuItem>
        )}
        {hasManageServerPolicy && (
          <MenuItem
            onClick={() => {
              dispatch(deleteServerAction(serverId));
            }}
          >
            Delete
          </MenuItem>
        )}
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

export default ServerItem;
