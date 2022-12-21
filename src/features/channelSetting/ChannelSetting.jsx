import React from 'react';
import {
  Box,
  Stack,
  Grid,
  colors,
  IconButton,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SidebarChannelSetting from './components/SidebarChannelSetting';
import ContentChannelSetting from './components/ContentChannelSetting';

function ChannelSetting() {
  const [index, setIndex] = React.useState(0);
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
          <SidebarChannelSetting handleIndexTab={handleIndexTab} />
        </Grid>
        <Grid
          item
          xs={8.5}
          color={colors.grey[100]}
          backgroundColor={colors.grey[800]}
        >
          <Grid container flexDirection="row">
            <Grid item xs={8.5}>
              <ContentChannelSetting index={index} />
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
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ChannelSetting;
