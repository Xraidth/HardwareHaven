import Ajv from "ajv";
import addErrors from "ajv-errors";
import { CategoriaDTOSchema } from "../lib/categoria-typesSchema.js";
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);
const validateSchema = ajv.compile(CategoriaDTOSchema);
export const categoriaDTO = (req, res, next) => {
    const isValid = validateSchema(req.body);
    if (!isValid) {
        const errors = validateSchema.errors ?? [];
        return res.status(400).send({
            errors: errors.map((error) => error.message),
        });
    }
    next();
};
//# sourceMappingURL=categoriaDTO.js.map