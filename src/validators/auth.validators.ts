import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import Validator from "../utils/validation/validator";

const authValidator = {
  login(req: Request, res: Response, next: NextFunction) {
    const validator = new Validator({
      email: Joi.string().required().label("E-mail"),
      password: Joi.string().required().label("Password"),
    });
    validator.validate(req.body);
    next();
  },
};

export default authValidator;
