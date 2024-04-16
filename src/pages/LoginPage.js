import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Grid } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import Logo from '../components/logo';
import Iconify from '../components/iconify';
import { LoginForm } from '../sections/auth/login';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const StyledSection = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  padding: theme.spacing(5, 3),
  textAlign: 'center',
}));

export default function LoginPage({onLogin}) {
  const mdUp = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Helmet>
        <title>Login | VVIMS SYSTEM</title>
      </Helmet>

      <Logo
        sx={{
          mt: { xs: 5, sm: 10 },
          mx: 'auto',
        }}
      />

      <Container>
        <Grid container spacing={3} justifyContent="center">
          {mdUp && (
            <Grid item md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <StyledSection>
                <Typography variant="h3" gutterBottom>
                  Hi, Welcome Back
                </Typography>
                <img src="/assets/illustrations/illustration_login.png" alt="login" />
              </StyledSection>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <StyledContent>
              <Typography variant="h4" gutterBottom>
                Sign in to VVIMS
              </Typography>

              


              <LoginForm onLogin={onLogin} />
              <Divider>
                <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
                  OR
                </Typography>
              </Divider>

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button fullWidth size="large" color="inherit" variant="outlined">
                  super-admin
                </Button>

                <Button fullWidth size="large" color="inherit" variant="outlined">
                  Company
                </Button>

                <Button fullWidth size="large" color="inherit" variant="outlined">
                  Client
                </Button>
              </Stack>

              <Typography variant="body2" sx={{ mt: 2 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" href="#">
                  Get started
                </Link>
              </Typography>
            </StyledContent>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
