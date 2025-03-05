import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { CompraDTOSchema } from "../lib/compra-typesSchema.js";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);
// Compila el esquema
const validateSchema = ajv.compile(CompraDTOSchema);
// Middleware para validar el DTO
export const compraDTO = (req, res, next) => {
    const isValid = validateSchema(req.body);
    if (!isValid) {
        const errors = validateSchema.errors ?? [];
        return res.status(400).send({
            errors: errors.map((error) => error.message),
        });
    }
    next();
};
//# sourceMappingURL=compraDTO.js.map