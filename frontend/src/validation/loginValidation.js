import Joi from "joi";
import tlds from "/node_modules/@sideway/address/lib/tlds.js";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: {
        allow: tlds,
      },
    })
    .required()
    .label("Email"),
  password: Joi.string().trim().min(6).max(20).required().label("Password"),
});

export default loginSchema;
