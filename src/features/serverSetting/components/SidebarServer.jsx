import {colors, Divider, Stack} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const SidebarServer = (props) => {
  const styleTab = {
    height: 30,
    mr: 0.5,
    mt: 0.3,
    borderRadius: 1,
    color: colors.grey[500],
    '&:hover': {
      backgroundColor: colors.grey[800],
      color: colors.grey[200],
    },
    cursor: 'pointer',
  };
  const [index, setIndex] = React.useState(0);
  return (
    <Stack pr={1}>
      <Box
        height="100%"
        py={6}
        sx={{ display: 'flex', flexDirection: 'row-reverse' }}
      >
        <Box>
          <Box sx={{ width: 200 }}>
            <Typography variant="h7">Name Server</Typography>
          </Box>
          <Stack className="tabList">
            <Stack
              justifyContent="center"
              sx={styleTab}
              bgcolor={index === 0 ? colors.grey[800] : ''}
              color={colors.grey[400]}
              onClick={() => {
                setIndex(0);
                props.handleIndexTab(0);
              }}
            >
              <Typography color={index === 0 ? colors.grey[100] : ''} px={2}>
                Overview
              </Typography>
            </Stack>
            <Stack
              justifyContent="center"
              sx={styleTab}
              bgcolor={index === 1 ? colors.grey[800] : ''}
              onClick={() => {
                setIndex(1);
                props.handleIndexTab(1);
              }}
            >
              <Typography color={index === 1 ? colors.grey[100] : ''} px={2}>
                Roles
              </Typography>
            </Stack>
            <Stack
              justifyContent="center"
              sx={styleTab}
              bgcolor={index === 2 ? colors.grey[800] : ''}
              onClick={() => {
                setIndex(2);
                props.handleIndexTab(2);
              }}
            >
              <Typography color={index === 2 ? colors.grey[100] : ''} px={2}>
                Members
              </Typography>
            </Stack>
            <Box py={1}>
              <Divider color={colors.grey[400]} />
            </Box>
            <Stack
              sx={styleTab}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography px={2}>Delete Server</Typography>
              <DeleteForeverIcon fontSize="small" />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}

export default SidebarServer
