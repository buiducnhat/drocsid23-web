import * as React from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  useTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from 'src/commons/components/Copyright';
import { useDispatch } from 'react-redux';
import { registerAction } from '../authenSlice';
import { Link as LinkDom, useNavigate } from 'react-router-dom';
import useCheckAuth from 'src/hooks/useCheckAuth';

export default function RegisterPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useCheckAuth();

  const themeMode = theme.palette.mode;
  const [inputs, setInputs] = React.useState({
    fullname: '',
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(registerAction(inputs));
  };

  React.useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: themeMode === 'light' ? 'primary.light' : 'primary.dark',
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome to Drocsid23
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Full name"
                autoFocus
                value={inputs.fullname}
                onChange={(e) =>
                  setInputs({ ...inputs, fullname: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email address"
                autoComplete="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Confirm password"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to the terms and conditions."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={LinkDom} to="/authen/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
