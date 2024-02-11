  import {Express, Request, Response} from "express";
import { createUserSchema } from "./schema/user.schema";

import validateResource from "./middleware/validateResource";

import { createUserHandler } from "./controllers/user.controller";
import { createUserSessionHandler } from "./controllers/session.controller.";
import { createSessionSchema } from "./schema/session.schema";
  function routes(app: Express) {

    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    app.post("/api/users", validateResource(createUserSchema), createUserHandler);

     app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  }

  export default routes