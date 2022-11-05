const validate = (objToValidate, schema) => {
  return schema.validate(objToValidate, { abortEarly: false });
};

export default validate;
