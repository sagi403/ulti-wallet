import Joi from "joi-browser";

const registerSchema = {
  name: Joi.string().min(2).required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string()
    .trim()
    .required()
    .label("Password")
    .regex(/[a-z]{1,}/, "lowercase")
    .regex(/[A-Z]{1,}/, "uppercase")
    .regex(/[0-9]{1,}/, "number")
    .regex(/[!@#$%&*]{1,}/, "special")
    .min(8)
    .error(errors => {
      errors.forEach(err => {
        if (err.context && err.context.name === "lowercase") {
          err.message = "Use 1 or more lowercase characters";
        }
        if (err.context && err.context.name === "uppercase") {
          err.message = "Use 1 or more uppercase characters";
        }
        if (err.context && err.context.name === "number") {
          err.message = "Use 1 or more numbers";
        }
        if (err.context && err.context.name === "special") {
          err.message = "Use 1 or more special characters";
        }
      });
      return errors;
    }),

  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .error(() => ({
      message: `"Confirm Password" must be the same as the password`,
    })),
};

export default registerSchema;
