import { Router } from "express";
import compraGetAllController from "../controllers/compra-GetAll.Controller.js";
import compraGetOneController from "../controllers/compra-GetOne.Controller.js";
import compraInsertController from "../controllers/compra-Insert.Controller.js";
import compraDeleteOneController from "../controllers/compra-DeleteOne.Controllers.js";
import compraUpdateController from "../controllers/compra-Update.Controllers.js";
import { sanitizeCompraInput } from "../security/compra-sanitize.dto.js";
import compraFacturationController from "../controllers/compra-Facturation.Controllers.js";
import userJWTDTOAdmin from "../dto/userJWTDTOAdmin.js";
import userJWTDTO from "../dto/userJWTDTO.js";
import { compraDTO } from "../dto/compraDTO.js";


const compraRouter = Router();



//middlewares
compraRouter .get('/getAll', userJWTDTOAdmin, compraGetAllController)
compraRouter .get('/getOne/:id', userJWTDTOAdmin, compraGetOneController)
compraRouter .post('/insert', userJWTDTO, sanitizeCompraInput,  compraDTO, compraInsertController);
compraRouter .delete('/deleteOne/:id',userJWTDTOAdmin,compraDeleteOneController);
compraRouter .put('/update/:id', userJWTDTO, sanitizeCompraInput,  compraDTO, compraUpdateController)
compraRouter .patch('/facturate/:id',userJWTDTO, compraFacturationController) 

export default compraRouter ;
