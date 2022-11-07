import Joi from "joi";

const addressSchema = Joi.object({
  address: Joi.string()
    .label("Address")
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      "address"
    )
    .error(errors => {
      errors.forEach(err => {
        if (err.local && err.local.name === "address") {
          err.message = "Invalid address";
        }
      });
      return errors;
    }),
});

export default addressSchema;
