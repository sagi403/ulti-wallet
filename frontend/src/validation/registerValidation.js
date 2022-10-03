import Joi from "joi-browser";

const registerSchema = {
  name: Joi.string()
    .min(2)
    .required()
    .error(() => ({
      message: "Name must be valid",
    })),
  email: Joi.string()
    .email()
    .required()
    .error(() => ({
      message: "Email must be valid",
    })),
  password: Joi.string()
    .trim()
    .min(4)
    .max(20)
    .required()
    .error(() => ({
      message: "Password must be between 4 and 20 characters",
    })),
  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .required()
    .error(() => ({
      message: "Passwords don't match",
    })),
};

export default registerSchema;
