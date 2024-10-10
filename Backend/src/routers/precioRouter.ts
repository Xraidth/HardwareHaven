import { Router } from "express";


import precioGetAllController from "../controllers/precio-GetAll.Controllers.js";
import precioGetOneController from "../controllers/precio-GetOne.Controllers.js";
import precioInsertController from "../controllers/precio-Insert.Controllers.js";
import precioDeleteOneController from "../controllers/precio-DeleteOne.Controllers.js";
import precioUpdateController from "../controllers/precio-Update.Controllers.js";

import {sanitizePrecioInput} from "../security/precio-sanitize.dto.js"
import userJWTDTOAdmin from "../dto/userJWTDTOAdmin.js";
import precioDTO from "../dto/precioDTO.js";
const precioRouter = Router();



//middlewares
precioRouter.get('/getAll',userJWTDTOAdmin, precioGetAllController)
precioRouter.get('/getOne/:id',userJWTDTOAdmin, precioGetOneController)
precioRouter.post('/insert',sanitizePrecioInput, userJWTDTOAdmin, precioDTO, precioInsertController);
precioRouter.delete('/deleteOne/:id',userJWTDTOAdmin, precioDeleteOneController);
precioRouter.put('/update/:id',userJWTDTOAdmin,sanitizePrecioInput, precioDTO, precioUpdateController)


export default precioRouter;
