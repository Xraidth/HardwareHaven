import { Router } from "express";
import compraGetAllController from "../controllers/compra-GetAll.Controller.js";
import compraGetOneController from "../controllers/compra-GetOne.Controller.js";
import compraInsertController from "../controllers/compra-Insert.Controller.js";
import compraDeleteOneController from "../controllers/compra-DeleteOne.Controllers.js";
import compraUpdateController from "../controllers/compra-Update.Controllers.js";
import { sanitizeCompraInput } from "../security/compra-sanitize.dto.js";


const compraRouter = Router();



//middlewares
compraRouter .get('/getAll', compraGetAllController)
compraRouter .get('/getOne/:id', compraGetOneController)
compraRouter .post('/insert',sanitizeCompraInput,  compraInsertController);
compraRouter .delete('/deleteOne/:id',compraDeleteOneController);
compraRouter .put('/Update/:id',sanitizeCompraInput, compraUpdateController)


export default compraRouter ;
