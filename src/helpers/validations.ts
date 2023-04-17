export const emailValidation = (value: string): boolean => {
  let isValid = false;
  const regex =
    /^([\w\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gm;

  if (regex.test(value)) {
    isValid = true;
  }

  return isValid;
};

export const loginValidate = (value: string): boolean => {
  let isValid = false;

  if (value !== '') {
    isValid = true;
  }

  return isValid;
};

export const passwordValidate = (value: string): boolean => {
  let isValid = false;

  if (value !== '') {
    isValid = true;
  }

  return isValid;
};
