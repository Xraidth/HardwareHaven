// userValidator.ts
import Ajv from "ajv";
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

import { NextFunction, Response } from "express";
import { CustomRequest } from "../Interfaces/interfaces";
import { UserDTOSchema } from "../../lib/user-typesSchema";

const ajv = new Ajv({ allErrors: true }).addKeyword('kind')

// Añadir formatos
addFormats(ajv, ['email']);
addErrors(ajv);

const validateSchema = ajv.compile(UserDTOSchema);

const userDTO = (req: CustomRequest, res: Response, next: NextFunction) => {
    const isDTOValid = validateSchema(req.body);
    if (!isDTOValid) {
        const errors = validateSchema.errors ?? [];
        
        return res.status(400).send({
            errors: errors.map((error) => error.message),
        });
    }

    next();
}

export default userDTO;
