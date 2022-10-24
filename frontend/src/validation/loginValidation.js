import Joi from "joi-browser";

const loginSchema = {
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().trim().min(6).max(20).required().label("Password"),
};

export default loginSchema;
