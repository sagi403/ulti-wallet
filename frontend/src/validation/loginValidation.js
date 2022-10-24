import Joi from "joi-browser";

const loginSchema = {
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().trim().required().label("Password"),
};

export default loginSchema;
