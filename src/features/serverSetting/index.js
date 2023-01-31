import React,{useState} from 'react'
import {colors, Grid, IconButton, Stack, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Typography from "@mui/material/Typography";
import SidebarServer from "src/features/serverSetting/components/SidebarServer";
import ContentSettingServer from "src/features/serverSetting/components/ContentSettingServer";

const ServerSetting = () => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const handleIndexTab = (index) => {
    setIndex(index);
  };
  return (
    <Stack minWidth={1000}>
      <Grid direction="row" container height="100vh">
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
                <IconButton>
                  <Link to="/" style={{ color: 'Grey' }}>
                    <HighlightOffIcon fontSize="large" />
                  </Link>
                </IconButton>
                <Typography color="grey"> ESC </Typography>
              </Box>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ServerSetting
