import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, colors, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Stack } from '@mui/system';
import SidebarSetting from './components/SidebarSetting';
import ContentSetting from './components/ContentSetting';
import { Link } from 'react-router-dom';

export default function UserSetting() {
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
          <SidebarSetting handleIndexTab={handleIndexTab} />
        </Grid>
        <Grid
          item
          xs={8.5}
          color={colors.grey[100]}
          backgroundColor={colors.grey[800]}
        >
          <Stack flexDirection="row">
            <Grid item xs={8.5}>
              <ContentSetting index={index} />
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
