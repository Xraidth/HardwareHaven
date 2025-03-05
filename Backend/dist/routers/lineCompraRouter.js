import { Router } from "express";
import lineaCompraGetAllController from "../controllers/lineaCompra-GetAll.Controller.js";
import lineaCompraGetOneController from "../controllers/lineaCompra-GetOne.Controller.js";
import lineaCompraInsertController from "../controllers/lineaCompra-Insert.Controller.js";
import lineaCompraDeleteOneController from "../controllers/lineaCompra-DeleteOne.Controllers.js";
import lineaCompraUpdateController from "../controllers/lineaCompra-Update.Controllers.js";
import { sanitizeLineaCompraInput } from "../security/lineaCompra-sanitize.dto.js";
import userJWTDTOAdmin from "../dto/userJWTDTOAdmin.js";
import userJWTDTO from "../dto/userJWTDTO.js";
import lineaCompraDTO from "../dto/lineaCompraDTO.js";
const lineaCompraRouter = Router();
//middlewares
lineaCompraRouter.get('/getAll', userJWTDTOAdmin, lineaCompraGetAllController);
lineaCompraRouter.get('/getOne/:id', userJWTDTOAdmin, lineaCompraGetOneController);
lineaCompraRouter.post('/insert', userJWTDTO, sanitizeLineaCompraInput, lineaCompraDTO, lineaCompraInsertController);
lineaCompraRouter.delete('/deleteOne/:id', userJWTDTO, lineaCompraDeleteOneController);
lineaCompraRouter.put('/update/:id', userJWTDTO, sanitizeLineaCompraInput, lineaCompraDTO, lineaCompraUpdateController);
export default lineaCompraRouter;
//# sourceMappingURL=lineCompraRouter.js.map