import { Request, Router } from "express";

export interface RoutController {
  readonly path: string;
  router: Router;
}
