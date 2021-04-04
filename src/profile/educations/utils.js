export const validateFields = (education, callback) => callback(
  education?.institution && education?.description && education?.startDate && education?.endDate,
);
