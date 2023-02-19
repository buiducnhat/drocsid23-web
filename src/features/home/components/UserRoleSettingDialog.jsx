import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Checkbox,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserToRoleAction,
  removeUserFromRoleAction,
  selectCurrentServer,
} from 'src/features/server/serverSlice';

const UserRoleSettingDialog = NiceModal.create(({ role }) => {
  const modal = useModal();
  const curServer = useSelector(selectCurrentServer);
  const dispatch = useDispatch();

  return (
    <Dialog {...muiDialogV5(modal)}>
      <DialogTitle>Role members</DialogTitle>

      <DialogContent sx={{ width: 500 }}>
        <List dense sx={{ width: '100%' }}>
          {curServer?.members?.map((user) => {
            const labelId = `checkbox-list-secondary-label-${user._id}`;
            return (
              <ListItem
                key={user._id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={(e) =>
                      dispatch(
                        e.target.checked
                          ? addUserToRoleAction({
                              serverId: curServer._id,
                              roleId: role._id,
                              userId: user._id,
                            })
                          : removeUserFromRoleAction({
                              serverId: curServer._id,
                              roleId: role._id,
                              userId: user._id,
                            })
                      )
                    }
                    checked={
                      role.users.findIndex((u) => u._id === user._id) !== -1
                    }
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${user._id + 1}`}
                      src={`https://i.pravatar.cc/150?u=${user._id}`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={user.fullname} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={() => modal.hide()}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default UserRoleSettingDialog;
