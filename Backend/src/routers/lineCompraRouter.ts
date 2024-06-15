import { Router } from "express";
import lineaCompraGetAllController from "../controllers/lineaCompra-GetAll.Controller.js";
import lineaCompraGetOneController from "../controllers/lineaCompra-GetOne.Controller.js";
import lineaCompraInsertController from "../controllers/lineaCompra-Insert.Controller.js";
import lineaCompraDeleteOneController from "../controllers/lineaCompra-DeleteOne.Controllers.js";
import lineaCompraUpdateController from "../controllers/lineaCompra-Update.Controllers.js";
import { sanitizeLineaCompraInput } from "../security/lineaCompra-sanitize.dto.js";


const lineaCompraRouter = Router();



//middlewares
lineaCompraRouter.get('/getAll', lineaCompraGetAllController)
lineaCompraRouter.get('/getOne/:id', lineaCompraGetOneController)
lineaCompraRouter.post('/insert',sanitizeLineaCompraInput,  lineaCompraInsertController);
lineaCompraRouter.delete('/deleteOne/:id',lineaCompraDeleteOneController);
lineaCompraRouter.put('/Update/:id',sanitizeLineaCompraInput, lineaCompraUpdateController)


export default lineaCompraRouter;
