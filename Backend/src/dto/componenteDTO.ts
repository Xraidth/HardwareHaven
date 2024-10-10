
// Instancia de Ajv
import Ajv from "ajv";
import addErrors from "ajv-errors";
import {  Response, NextFunction } from "express";
import { ComponenteDTOSchema } from "../lib/componente-typesSchema";
import { CustomRequest } from "../Interfaces/interfaces";

const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

// Compila el esquema
const validateSchema = ajv.compile(ComponenteDTOSchema);

// Middleware para validar el DTO
export const componenteDTO = (req: CustomRequest, res: Response, next: NextFunction) => {
  const isValid = validateSchema(req.body);
  if (!isValid) {
    const errors = validateSchema.errors ?? [];
    return res.status(400).send({
      errors: errors.map((error) => error.message),
    });
  }
  next();
};
