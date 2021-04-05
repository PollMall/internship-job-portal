export const validateFields = (workExperience, callback) => callback(
  workExperience?.institution
  && workExperience?.description
  && workExperience?.startDate
  && workExperience?.endDate,
);
