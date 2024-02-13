//Validate various form fields

/**
 * Validate email form fields
 * @param fieldValue
 * @returns {string}
 */
const validEmailField = (fieldValue) => {
  if (fieldValue === '') {
    return 'Please enter your email address.\n';
  } else if (!validateEmail(fieldValue)) {
    return 'Please enter a valid email address.\n';
  }
  return '';
}

/**
 * Validate generic form fields
 * @param fieldValue
 * @param fieldName
 * @returns {string}
 */
const validGenericField = (fieldValue, fieldName) => {
  if (fieldValue === '') {
    return `Please enter your ${fieldName}.\n`;
  }
  return '';
}

/**
 * Validate phone form fields (for the masked input of the format (123) 456-7890)
 * @param fieldValue
 * @returns {string}
 */
const validPhoneField = (fieldValue) => {
  if (fieldValue === '') {
    return 'Please enter your phone number.\n';
  } else if (!validatePhone(fieldValue)) {
    return 'Please enter a valid phone number.\n';
  }
  return '';
}


export {validEmailField, validPhoneField, validGenericField};

/**
 * Validates an email address with regex
 * @param email
 * @returns {boolean}
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number with regex
 * @param phone
 * @returns {boolean}
 */
const validatePhone = (phone) => {
  //const phoneRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-8][02-9])\s*(?:[.-]\s*)?([0-9]{4})$/;
  // validate  the phone number is in format (123) 456-7890 and 14 characters long
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phone);
}
