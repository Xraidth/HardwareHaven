import { Router } from "express";
import categoriaGetAllController from "../controllers/categoria-GetAll.Controller.js";
import categoriaGetOneController from "../controllers/categoria-GetOne.Controller.js";
import { sanitizeCategoriaInput } from "../security/categoria-sanitize.dto.js";
import categoriaInsertController from "../controllers/categoria-Insert.Controller.js";
import categoriaDeleteOneController from "../controllers/categoria-DeleteOne.Controllers.js";
import categoriaUpdateController from "../controllers/categoria-Update.Controllers.js";
import userJWTDTO from "../dto/userJWTDTO.js";
import userJWTDTOAdmin from "../dto/userJWTDTOAdmin.js";
import { categoriaDTO } from "../dto/categoriaDTO.js";
const categoriaRouter = Router();
//middlewares
categoriaRouter.get('/getAll', userJWTDTO, categoriaGetAllController);
categoriaRouter.get('/getOne/:id', userJWTDTOAdmin, categoriaGetOneController);
categoriaRouter.post('/insert', userJWTDTOAdmin, sanitizeCategoriaInput, categoriaDTO, categoriaInsertController);
categoriaRouter.delete('/deleteOne/:id', userJWTDTOAdmin, categoriaDeleteOneController);
categoriaRouter.put('/update/:id', userJWTDTOAdmin, sanitizeCategoriaInput, categoriaDTO, categoriaUpdateController);
export default categoriaRouter;
//# sourceMappingURL=categoriaRouter.js.map