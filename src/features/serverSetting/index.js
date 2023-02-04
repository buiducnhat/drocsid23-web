import React,{useState} from 'react'
import {colors, Grid, IconButton, Stack, useTheme,Dialog} from "@mui/material";
import Box from "@mui/material/Box";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Typography from "@mui/material/Typography";
import SidebarServer from "src/features/serverSetting/components/SidebarServer";
import ContentSettingServer from "src/features/serverSetting/components/ContentSettingServer";
import NiceModal, {useModal} from '@ebay/nice-modal-react';


const ServerSetting = NiceModal.create(() => {
  const theme = useTheme();
  const [index, setIndex] = React.useState(0);
  const handleIndexTab = (index) => {
    setIndex(index);
  };
  const modal = useModal();

  return (
    <Dialog open={modal.visible} onClose={() => modal.hide()} fullWidth maxWidth="false" sx={{height:'100vh'}}>
        <Stack >
          <Grid direction="row" container height="90vh">
            <Grid
              item
              xs={3.5}
              color={colors.grey[100]}
              backgroundColor={colors.grey[900]}
            >
              <SidebarServer handleIndexTab={handleIndexTab} />
            </Grid>
            <Grid
              item
              xs={8.5}
              color={colors.grey[100]}
              backgroundColor={theme.palette.grey[850]}
            >
              <Stack flexDirection="row">
                <Grid item xs={8.5}>
                  <ContentSettingServer index = {index}  />
                </Grid>
                <Grid item xs={3.5}>
                  <Box
                    sx={{ color: colors.grey[400] }}
                    justifyContent="center"
                    pt={6}
                    position="absolute"
                    align="center"
                  >
                    <IconButton onClick={() => modal.hide()}>
                        <HighlightOffIcon fontSize="large" />
                    </IconButton>
                    <Typography color="grey"> ESC </Typography>
                  </Box>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
    </Dialog>
  );
});

export default ServerSetting;
