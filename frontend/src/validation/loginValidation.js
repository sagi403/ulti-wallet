import Joi from "joi-browser";

const loginSchema = {
  email: Joi.string()
    .email()
    .required()
    .error(() => ({
      message: "Email must be valid",
    })),
  password: Joi.string()
    .trim()
    .required()
    .error(() => ({
      message: "You must supply a password",
    })),
};

export default loginSchema;
