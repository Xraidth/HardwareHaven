import { Router } from "express";
import compGetAllController from "../controllers/componente-GetAll.Controllers.js";
import compGetOneController from "../controllers/componente-GetOne.Controllers.js";
import compInsertController from "../controllers/componente-Insert.Controllers.js";
import compUpdateDescriptionController from "../controllers/componente-UpdateDescription.Controllers.js";
import compUpdateCompNameController from "../controllers/componente-UpdateCompName.Controllers.js";
import compDeleteOneController from "../controllers/componente-DeleteOne.Controllers.js";
import compUpdateController from "../controllers/componente-Update.Controllers.js";
//Imports de validaciones
import { sanitizeComponenteInput } from "../security/componente-sanitize.dto .js";
import userJWTDTO from "../dto/userJWTDTO.js";
import userJWTDTOAdmin from "../dto/userJWTDTOAdmin.js";
import { componenteDTO } from "../dto/componenteDTO.js";
const compRouter = Router();
//middlewares
compRouter.get('/getAll', userJWTDTO, compGetAllController);
compRouter.get('/getOne/:id', userJWTDTO, compGetOneController);
compRouter.post('/insert', userJWTDTOAdmin, sanitizeComponenteInput, componenteDTO, compInsertController);
compRouter.patch('/updateDescription/:id', userJWTDTOAdmin, sanitizeComponenteInput, componenteDTO, compUpdateDescriptionController);
compRouter.patch('/updateCompName/:id', userJWTDTOAdmin, sanitizeComponenteInput, componenteDTO, compUpdateCompNameController);
compRouter.delete('/deleteOne/:id', userJWTDTOAdmin, compDeleteOneController);
compRouter.put('/update/:id', userJWTDTOAdmin, sanitizeComponenteInput, componenteDTO, compUpdateController);
export default compRouter;
//# sourceMappingURL=componenteRouter.js.map