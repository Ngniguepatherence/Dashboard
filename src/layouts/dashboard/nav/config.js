// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Companies',
    path: '/dashboard/users',
    icon: icon('ic_usergroup'),
  },
  {
    title: 'Visitors',
    path: '/dashboard/user',
    icon: icon('ic_usergroup'),
  },
  {
    title: 'Vehicles',
    path: '/dashboard/vehicle',
    icon: icon('ic_car'),
  },
  {
    title: 'Reports',
    path: '/dashboard/products',
    icon: icon('ic_reports'),
  },
  {
    title: 'Settings',
    path: '/dashboard/cotisation',
    icon: icon('ic_settings'),
  }
  
];

export default navConfig;
