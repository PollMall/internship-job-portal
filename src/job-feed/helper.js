const makeSectionFields = (job) => ([
  {
    id: 1,
    fields: [
      {
        id: 1,
        title: 'Description',
        data: [
          {
            id: 1,
            field: job.description,
          },
        ],
        component: 'p',
      },
      {
        id: 2,
        title: 'Contact info',
        data: [
          {
            id: 1,
            field: `${job.company.user.firstName} ${job.company.user.lastName}`,
          },
          {
            id: 2,
            field: `Address: ${job.company.contactInfo.city}, ${job.company.contactInfo.country.name}`,
          },
          {
            id: 3,
            field: `Email: ${job.company.contactInfo.email}`,
          },
          {
            id: 4,
            field: `Phone: ${job.company.contactInfo.phone}`,
          },
          {
            id: 5,
            field: `Website: ${job.company.contactInfo.website}`,
          },
        ],
        component: 'p',
      },
      {
        id: 3,
        title: 'About company',
        data: [
          {
            id: 1,
            field: job.company.contactInfo.about,
          }],
        component: 'p',
      }],
  },
  {
    id: 2,
    fields: [
      {
        id: 1,
        title: 'Required skills',
        data: job.jobSkills.map((js, idx) => ({
          id: idx,
          field: js.skill.name,
        })),
        component: 'li',
      },
      {
        id: 2,
        title: 'Job requirements',
        data: job.jobRequirements.map((jr, idx) => ({
          id: idx,
          field: jr.name,
        })),
        component: 'li',
      },
      {
        id: 3,
        title: 'Job benefits',
        data: job.jobBenefits.map((jb, idx) => ({
          id: idx,
          field: jb.name,
        })),
        component: 'li',
      },
    ],
  },
]);

export default makeSectionFields;
