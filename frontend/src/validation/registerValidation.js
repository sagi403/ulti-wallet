import Joi from "joi-browser";

const registerSchema = {
  name: Joi.string().min(2).required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().trim().min(4).max(20).required().label("Password"),
  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .error(() => ({
      message: `"Confirm Password" must be the same as the password`,
    })),
};

export default registerSchema;
