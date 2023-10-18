const sanitizeString = (input) => {
  // Remove special characters and sanitize the input string
  // For example, you can use a regular expression to allow only alphanumeric characters and spaces
  return input.replace(/[^a-zA-Z0-9 ]/g, "").trim();
};

export { sanitizeString };
