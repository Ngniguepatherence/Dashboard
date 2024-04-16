import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/image.png`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: '26/03/2024 - 8:00 AM', 
  status: sample(['flag', 'unflag']),
  role: sample([
    'Visit for site seeing',
    'Visit for site seeing',
    'Visit for site seeing',
    'Visit for site seeing',
    'Visit for site seeing',
    'Visit for site seeing',
    'Visit for site seeing',
    'Full Stack Designer',
    'Visit for site seeing',
    'Visit for site seeingr',
  ]),
}));

export default users;
