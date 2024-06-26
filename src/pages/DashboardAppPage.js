import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          VVIM Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Visitors" total={6} icon={'ant-design:fund-projection-screen-outlined'}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total vehicles" total={7} color="info" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Flagged Vehicles" total={6} color="warning" icon={'ant-design:bank-outlined'} />
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <AppConversionRates
              title="Entry Statistics"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Monday', value: 100 },
                { label: 'Tuesday', value: 200 },
                { label: 'Wed', value: 310 },
                { label: 'Thursday', value: 405 },
                { label: 'Friday', value: 220 },
                { label: 'Saturday', value: 300 },
                
              ]}
            />
          </Grid>
         


          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}
          <Grid item xs={12} md={6} lg={5}>
            <AppNewsUpdate
              title="Recently Logged In Vehicles"
              list={[...Array(2)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/image.png`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>


          
        </Grid>
      </Container>
    </>
  );
}
