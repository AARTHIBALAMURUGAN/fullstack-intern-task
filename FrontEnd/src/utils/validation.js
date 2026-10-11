
export const NAME_REGEX = /^\p{L}[\p{L}\s'.-]{1,49}$/u;


export const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;


export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,72}$/;

export const PASSWORD_HINT =
  "password must be 8 characters with one upper and one lower case letters, a number and a symbol.";

export const validateName = (value) => {
  const name = value.trim();
  if (!name) return "Enter your full name.";
  if (!NAME_REGEX.test(name)) {
    return "Use 2-50 letters. Spaces, apostrophes, dots and hyphens are allowed.";
  }
  return "";
};

export const validateEmail = (value) => {
  const email = value.trim();
  if (!email) return "Enter your email address.";
  if (!EMAIL_REGEX.test(email)) {
    return "Enter a valid email address, like you@example.com.";
  }
  return "";
};


export const validateNewPassword = (value) => {
  if (!value) return "Create a password.";
  if (!PASSWORD_REGEX.test(value)) return PASSWORD_HINT;
  return "";
};


export const validateLoginPassword = (value) => {
  if (!value) return "Enter your password.";

  if (value.length > 72) {
    return "Password must be 72 characters or fewer.";
  }

  if (!PASSWORD_REGEX.test(value)) {
    return PASSWORD_HINT;
  }

  return "";
};
