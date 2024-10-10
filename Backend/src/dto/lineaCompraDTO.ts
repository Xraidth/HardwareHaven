import { LineaCompraDTOSchema } from '../lib/lineaCompra-typesSchema';
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../Interfaces/interfaces"; 


// Instancia de Ajv
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

// Compila el esquema
const validateSchema = ajv.compile(LineaCompraDTOSchema);

// Middleware para validar el DTO
const lineaCompraDTO = (req: CustomRequest, res: Response, next: NextFunction) => {
  const isValid = validateSchema(req.body);
  if (!isValid) {
    const errors = validateSchema.errors ?? [];
    return res.status(400).send({
      errors: errors.map((error) => error.message),
    });
  }
  next();
};

export default lineaCompraDTO ;
