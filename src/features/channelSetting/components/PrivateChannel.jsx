import React from 'react';
import {
  Button,
  Checkbox,
  colors,
  Dialog,
  DialogActions,
  Divider,
  Slide,
  Stack,
  Typography, useTheme,
} from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyleTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
const roles = [
  { name: 'VIP' },
  { name: 'SVIP' },
  { name: 'VVIP' },
  { name: 'Master' },
  { name: 'Member' },
];
const members = [
  {
    id: 2,
    username: 'NamNV',
    avatar:
      'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg',
  },
  {
    id: 3,
    username: 'trungAA',
    avatar:
      'https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg',
  },
  {
    id: 4,
    username: 'HangAS',
    avatar:
      'https://www.creativefabrica.com/wp-content/uploads/2021/04/11/Woman-Avatar-Icon-Vector-Graphics-10677522-1-580x387.jpg',
  },
  {
    id: 5,
    username: 'NghiaTV',
    avatar: 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
  },
];
const DialogAddRole = (props) => {
  const [getRole, setGetRole] = React.useState([]);
  const handleGetRole = (e) => {
    if (getRole.includes(e.target.value)) {
      setGetRole(getRole.filter((item) => item !== e.target.value));
    } else {
      setGetRole([...getRole, e.target.value]);
    }
  };
  const [getMemberID, setGetMemberID] = React.useState([]);
  const handleGetMember = (id) => {
    if (getMemberID.includes(id)) {
      setGetMemberID(getMemberID.filter((item) => item !== id));
    } else {
      setGetMemberID([...getMemberID, id]);
    }
  };
  const handleAddRole = () => {
    function filterMembersById(members, ids) {
      return members.filter((member) => ids.includes(member.id));
    }
    const newMembers = filterMembersById(members, getMemberID);
    props.handleAddRole({
      dataRole: getRole,
      dataMember: newMembers,
    });
    props.handleCloseAddRole();
  };
  return (
    <Stack p={2} bgcolor={colors.grey[800]} color={colors.grey[300]}>
      <Typography color={colors.grey[200]} fontSize={24} align="center">
        Add members or roles
      </Typography>
      <Divider sx={{ backgroundColor: colors.grey[700], marginY: 1 }} />
      <Stack width={400}>
        <Stack mt={1.5} style={{ maxHeight: 300, overflow: 'auto' }}>
          <Typography fontSize={15}>ROLES</Typography>
          {roles.map((role, index) => (
            <Stack
              key={index + role.name}
              classes="addRoles"
              direction="row"
              alignItems="center"
            >
              <Checkbox
                className="checkboxRole"
                sx={{
                  color: colors.grey[400],
                  '&.Mui-checked': {
                    color: colors.grey[400],
                  },
                }}
                value={role.name}
                onChange={handleGetRole}
              />
              <TokenIcon />
              <Typography ml={1}>{role.name}</Typography>
            </Stack>
          ))}
          <Typography fontSize={15} mt={1.5}>
            MEMBERS
          </Typography>
          {members.map((member, index) => (
            <Stack
              key={member.id}
              classes="addMembers"
              direction="row"
              alignItems="center"
            >
              <Checkbox
                sx={{
                  color: colors.grey[400],
                  '&.Mui-checked': {
                    color: colors.grey[400],
                  },
                }}
                onChange={() => handleGetMember(member.id)}
              />
              <Avatar sx={{ width: 24, height: 24 }} src={member.avatar} />
              <Typography ml={1}>{member.username}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <DialogActions>
        <Button
          mr={2}
          sx={{ color: colors.grey[100] }}
          onClick={props.handleCloseAddRole}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleAddRole}>
          Done
        </Button>
      </DialogActions>
    </Stack>
  );
};

export default function PrivateChannel() {
  const [dataRole, setDataRole] = React.useState([]);
  const [dataMember, setDataMember] = React.useState([]);
  const [openDialogAddRole, setOpenDialogAddRole] = React.useState(false);
  const handleOpenAddRole = () => {
    setOpenDialogAddRole(true);
  };
  const handleCloseAddRole = () => {
    setOpenDialogAddRole(false);
  };
  const handleAddRole = (data) => {
    setDataRole(data.dataRole);
    setDataMember(data.dataMember);
  };
  const handleDeleteMember = (id) => {
    setDataMember(dataMember.filter((member) => member.id !== id));
  };
  const handleDeleteRole = (data) => {
    setDataRole(dataRole.filter((role) => role !== data));
  };
  const theme = useTheme()
  return (
    <Stack bgcolor={theme.palette.grey[800]} borderRadius={2}>
      <Stack
        p={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontSize={14} color={colors.grey[200]}>
          WE CAN ACCESS THIS CHANNEL ?
        </Typography>
        <Button variant="contained" onClick={handleOpenAddRole}>
          Add members or roles
        </Button>
        <Dialog
          open={openDialogAddRole}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseAddRole}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogAddRole
            handleAddRole={handleAddRole}
            handleCloseAddRole={handleCloseAddRole}
          />
        </Dialog>
      </Stack>
      <Divider />
      <Stack p={1.5}>
        <Typography mb={1} color={colors.grey[200]}>
          Roles
        </Typography>
        {dataRole.map((role, index) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            key={index + role}
          >
            <Stack direction="row">
              <TokenIcon />
              <Typography ml={1} mb={1.2}>
                {role}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography fontSize={13}>Role</Typography>
              <StyleTooltip
                title={'Remove access to channel'}
                placement="right"
              >
                <IconButton>
                  <Stack color={colors.grey[300]}>
                    <HighlightOffIcon onClick={() => handleDeleteRole(role)} />
                  </Stack>
                </IconButton>
              </StyleTooltip>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Divider />
      <Stack p={1.5}>
        <Typography mb={1} color={colors.grey[200]}>
          Members
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <Avatar sx={{ width: 24, height: 24 }} />
            <Typography ml={1}>admin channel</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography fontSize={13}>Server Owner</Typography>
            <IconButton disabled>
              <HighlightOffIcon />
            </IconButton>
          </Stack>
        </Stack>
        {dataMember.map((member) => (
          <Stack
            key={member.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center">
              <Avatar
                sx={{ width: 24, height: 24 }}
                src={member.avatar}
              ></Avatar>
              <Typography ml={1}>{member.username}</Typography>
            </Stack>
            <StyleTooltip title={'Remove access to channel'} placement="right">
              <IconButton>
                <Stack color={colors.grey[300]}>
                  <HighlightOffIcon
                    onClick={() => {
                      handleDeleteMember(member.id);
                    }}
                  />
                </Stack>
              </IconButton>
            </StyleTooltip>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
