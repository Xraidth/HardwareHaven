import { Router } from "express";
import precioGetAllController from "../controllers/precio-GetAll.Controllers.js";
import precioGetOneController from "../controllers/precio-GetOne.Controllers.js";
import precioInsertController from "../controllers/precio-Insert.Controllers.js";
import precioDeleteOneController from "../controllers/precio-DeleteOne.Controllers.js";
import precioUpdateController from "../controllers/precio-Update.Controllers.js";
import { sanitizePrecioInput } from "../security/precio-sanitize.dto.js";
const precioRouter = Router();
//middlewares
precioRouter.get('/getAll', precioGetAllController);
precioRouter.get('/getOne/:id', precioGetOneController);
precioRouter.post('/insert', sanitizePrecioInput, precioInsertController);
precioRouter.delete('/deleteOne/:id', precioDeleteOneController);
precioRouter.put('/Update/:id', sanitizePrecioInput, precioUpdateController);
export default precioRouter;
//# sourceMappingURL=precioRouter.js.map