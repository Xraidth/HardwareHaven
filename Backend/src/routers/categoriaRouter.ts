import { Router } from "express";
import categoriaGetAllController from "../controllers/categoria-GetAll.Controller.js";
import categoriaGetOneController from "../controllers/categoria-GetOne.Controller.js";
import { sanitizeCategoriaInput } from "../security/categoria-sanitize.dto.js";
import categoriaInsertController from "../controllers/categoria-Insert.Controller.js";
import categoriaDeleteOneController from "../controllers/categoria-DeleteOne.Controllers.js";
import categoriaUpdateController from "../controllers/categoria-Update.Controllers.js";
import userJWTDTOAdmin from "../dto/userJWTDTOAdmin.js";





const categoriaRouter = Router();



//middlewares
categoriaRouter.get('/getAll',userJWTDTOAdmin, categoriaGetAllController)
categoriaRouter.get('/getOne/:id', userJWTDTOAdmin,categoriaGetOneController)
categoriaRouter.post('/insert',sanitizeCategoriaInput, userJWTDTOAdmin, categoriaInsertController);
categoriaRouter.delete('/deleteOne/:id',userJWTDTOAdmin, categoriaDeleteOneController);
categoriaRouter.put('/update/:id',sanitizeCategoriaInput,userJWTDTOAdmin, categoriaUpdateController)


export default categoriaRouter;
