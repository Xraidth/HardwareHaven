import { PrecioDTOSchema } from '../lib/precio-typesSchema';
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../Interfaces/interfaces"; 


const ajv = new Ajv({ allErrors: true }).addKeyword('kind')
addFormats(ajv, ['date-time']);
addErrors(ajv);

const validateSchema = ajv.compile(PrecioDTOSchema);

const precioDTO = (req: CustomRequest, res: Response, next: NextFunction) => {
    const isDTOValid = validateSchema(req.body);
    if (!isDTOValid) {
        const errors = validateSchema.errors ?? [];
        
        return res.status(400).send({
            errors: errors.map((error) => error.message),
        });
    }

    next();
};

export default precioDTO;
