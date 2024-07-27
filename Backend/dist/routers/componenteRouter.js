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
const compRouter = Router();
//middlewares
compRouter.get('/getAll', compGetAllController);
compRouter.get('/getOne/:id', compGetOneController);
compRouter.post('/insert', sanitizeComponenteInput, compInsertController);
compRouter.patch('/updateDescription/:id', sanitizeComponenteInput, compUpdateDescriptionController);
compRouter.patch('/updateCompName/:id', sanitizeComponenteInput, compUpdateCompNameController);
compRouter.delete('/deleteOne/:id', compDeleteOneController);
compRouter.put('/update/:id', sanitizeComponenteInput, compUpdateController);
export default compRouter;
//# sourceMappingURL=componenteRouter.js.map