export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateProjectForm = (formData) => {
  const errors = {};

  if (!formData.title || formData.title.trim() === '') {
    errors.title = 'Title is required';
  }

  if (!formData.shortDescription || formData.shortDescription.trim() === '') {
    errors.shortDescription = 'Short description is required';
  }

  if (!formData.description || formData.description.trim() === '') {
    errors.description = 'Full description is required';
  }

  if (!formData.thumbnail) {
    errors.thumbnail = 'Thumbnail is required';
  }

  if (formData.tags && !Array.isArray(formData.tags)) {
    errors.tags = 'Tags must be an array';
  }

  if (formData.links) {
    if (!Array.isArray(formData.links)) {
      errors.links = 'Links must be an array';
    } else {
      formData.links.forEach((link, index) => {
        if (!link.type || !link.url) {
          if (!errors.links) errors.links = [];
          errors.links[index] = 'Link must have type and URL';
        }
      });
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
