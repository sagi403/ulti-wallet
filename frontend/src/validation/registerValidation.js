import Joi from "joi";
import tlds from "/node_modules/@sideway/address/lib/tlds.js";

const registerSchema = Joi.object({
  name: Joi.string().min(2).required().label("Name"),
  email: Joi.string()
    .email({
      tlds: {
        allow: tlds,
      },
    })
    .required()
    .label("Email"),
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
        if (err.local && err.local.name === "lowercase") {
          err.message = "Use 1 or more lowercase characters";
        }
        if (err.local && err.local.name === "uppercase") {
          err.message = "Use 1 or more uppercase characters";
        }
        if (err.local && err.local.name === "number") {
          err.message = "Use 1 or more numbers";
        }
        if (err.local && err.local.name === "special") {
          err.message = "Use 1 or more special characters";
        }
      });
      return errors;
    }),
  confirmPassword: Joi.string()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .error(errors => {
      errors.forEach(err => {
        if (err.code === "any.only") {
          err.message = `"Confirm Password" must be the same as the password`;
        }
      });
      return errors;
    }),
});

export default registerSchema;
