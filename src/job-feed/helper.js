const makeSectionFields = (job) => ([
  [{
    title: 'Description',
    data: [job.description],
    component: 'p',
  },
  {
    title: 'Contact info',
    data: [
      `${job.company.user.firstName} ${job.company.user.lastName}`,
      `Address: ${job.company.contactInfocity}, ${job.company.contactInfo.country.name}`,
      `Email: ${job.company.contactInfo.email}`,
      `Phone: ${job.company.contactInfo.phone}`,
      `Website: ${job.company.contactInfo.website}`,
    ],
    component: 'p',
  },
  {
    title: 'About company',
    data: [job.company.contactInfo.about],
    component: 'p',
  }],
  [
    {
      title: 'Required skills',
      data: job.jobSkills.map((js) => js.skill.name),
      component: 'li',
    },
    {
      title: 'Job requirements',
      data: job.jobRequirements.map((jr) => jr.name),
      component: 'li',
    },
    {
      title: 'Job benefits',
      data: job.jobBenefits.map((jb) => jb.name),
      component: 'li',
    },
  ],
]);

export default makeSectionFields;
