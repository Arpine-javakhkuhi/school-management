import Joi from "joi";
import { GraphQLError } from "graphql";

import { HTTPStatus } from "../../types/main.types";

class Validator {
  private schema: Joi.ObjectSchema;

  constructor(schema: Joi.SchemaMap) {
    this.schema = Joi.object(schema).options({ allowUnknown: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: any, assign: boolean = true): void {
    const result = this.schema.validate(value);
    if (result.error) {
      throw new GraphQLError(result.error?.message, {
        extensions: {
          code: HTTPStatus.BadRequest,
        },
      });
    }
    if (assign) {
      Object.assign(value, result.value);
    }
  }
}

export default Validator;
