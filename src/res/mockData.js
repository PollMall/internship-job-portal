export const users = [
  {
    id: 1,
    username: 'a',
    password: 'a',
    firstName: 'a',
    lastName: 'a',
    userRole: {
      id: 3,
      name: 'user',
    },
  },
  {
    id: 2,
    username: 'b',
    password: 'b',
    firstName: 'b',
    lastName: 'b',
    userRole: {
      id: 3,
      name: 'user',
    },
  },
  {
    id: 3,
    username: 'c',
    password: 'c',
    firstName: 'c',
    lastName: 'c',
    userRole: {
      id: 3,
      name: 'user',
    },
  },
];

export const admin = {
  id: 1,
  username: 'c',
  password: 'c',
  firstName: 'c',
  lastName: 'c',
  userRole: {
    id: 1,
    name: 'sys_admin',
  },
};

export const userRoles = [
  {
    id: 1,
    name: 'sys_admin',
  },
  {
    id: 2,
    name: 'company_user',
  },
  {
    id: 3,
    name: 'user',
  },
];

export const contactInfo = {
  id: 1,
  email: 'email',
  phone: '+41234567890',
  city: 'city',
  country: {
    id: 1,
    name: 'country',
  },
  website: 'website',
  avatarUrl: 'url',
  about: 'about',
};

export const user = {
  id: 1,
  username: 'username',
  firstName: 'firstName',
  lastName: 'lastName',
  password: 'password',
  contactInfo,
  userEducations: [
    {
      id: 1,
      institution: 'institution',
      description: 'description',
      startDate: '1538265600',
      endDate: '1617235200',
    },
    {
      id: 2,
      institution: 'institution2',
      description: 'description2',
      startDate: '1538265600',
      endDate: '1617235200',
    },
  ],
  userWorkExperiences: [
    {
      id: 1,
      institution: 'institution',
      description: 'description',
      startDate: '1617148800',
      endDate: '1617235200',
    },
    {
      id: 2,
      institution: 'institution2',
      description: 'description2',
      startDate: '1617148800',
      endDate: '1617235200',
    },
  ],
  userSkills: [
    {
      id: 1,
      skill: {
        id: 1,
        name: 'HTML',
      },
      rating: 5,
    },
    {
      id: 2,
      skill: {
        id: 2,
        name: 'CSS',
      },
      rating: 5,
    },
  ],
  updatedAt: 1617309323,
};

export const jobs = [
  {
    id: 1,
    name: 'Senior Frontend Engineer (ReactJS)',
    description: "We're hiring! Start your career as a UI developer",
    isAvailable: true,
    company: {
      name: 'Modus Create',
    },
    updatedAt: 1614432203,
  },
  {
    id: 2,
    name: 'Full stack developer',
    description: 'Looking for a passionate full stack developer',
    isAvailable: true,
    company: {
      name: 'Modus Create',
    },
    updatedAt: 1614432203,
  },
];

export const jobDetails = {
  id: 1,
  name: 'Senior Frontend Engineer (ReactJS)',
  description: "We're hiring! Start your career as a UI developer",
  company: {
    name: 'Modus Create',
    user: {
      firstName: 'Management',
      lastName: 'Modus',
    },
    contactInfo: {
      email: 'contact@moduscreate.com',
      phone: '+40-0786-887-444',
      city: 'Cluj Napoca',
      country: {
        name: 'Romania',
      },
      website: 'https://moduscreate.com/',
      avatarUrl: 'https://api.adorable.io/avatars/285/abott@adorable.png',
      about: 'Digital transformation company ...',
    },
  },
  jobSkills: [
    {
      skill: {
        name: 'HTML',
      },
      rating: 3,
    },
    {
      skill: {
        name: 'CSS',
      },
      rating: 3,
    },
    {
      skill: {
        name: 'JS',
      },
      rating: 3,
    },
    {
      skill: {
        name: 'React',
      },
      rating: 4,
    },
  ],
  jobRequirements: [
    {
      name: 'Played with HTML, CSS, JS before',
    },
    {
      name: 'Knows his/her ways with colors',
    },
    {
      name: '99+ years experience would be nice',
    },
  ],
  jobBenefits: [
    {
      name: 'Cool teammates',
    },
    {
      name: 'Open space, open minded',
    },
    {
      name: 'We have a ping-pong table',
    },
  ],
};
