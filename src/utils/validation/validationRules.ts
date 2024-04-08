import Joi from "joi";

type RuleOptions = {
  required?: boolean;
  label?: string;
};

const setOptions = <T extends Joi.AnySchema>(
  schema: T,
  options: RuleOptions,
): T => {
  let newSchema = schema;
  if (options.required) {
    newSchema = newSchema.required();
  }
  if (options.label) {
    newSchema = newSchema.label(options.label);
  }
  return newSchema;
};

const validationRules = {
  id(options: RuleOptions = { required: true }): Joi.NumberSchema {
    const schema = Joi.number().integer();
    return setOptions(schema, options) as Joi.NumberSchema;
  },
};

export default validationRules;
