export const combineFilesToFormData = (files: File[]): FormData => {
  
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("Files", file);
  });
  return formData;
};
