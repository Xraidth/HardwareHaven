import { Router } from "express";
import categoriaGetAllController from "../controllers/categoria-GetAll.Controller.js";
import categoriaGetOneController from "../controllers/categoria-GetOne.Controller.js";
import { sanitizeCategoriaInput } from "../security/categoria-sanitize.dto.js";
import categoriaInsertController from "../controllers/categoria-Insert.Controller.js";
import categoriaDeleteOneController from "../controllers/categoria-DeleteOne.Controllers.js";
import categoriaUpdateController from "../controllers/categoria-Update.Controllers.js";
const categoriaRouter = Router();
//middlewares
categoriaRouter.get('/getAll', categoriaGetAllController);
categoriaRouter.get('/getOne/:id', categoriaGetOneController);
categoriaRouter.post('/insert', sanitizeCategoriaInput, categoriaInsertController);
categoriaRouter.delete('/deleteOne/:id', categoriaDeleteOneController);
categoriaRouter.put('/Update/:id', sanitizeCategoriaInput, categoriaUpdateController);
export default categoriaRouter;
//# sourceMappingURL=categoriaRouter.js.map