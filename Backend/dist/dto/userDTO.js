// userValidator.ts
import Ajv from "ajv";
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { UserDTOSchema } from "../lib/user-typesSchema.js";
const ajv = new Ajv({ allErrors: true }).addKeyword('kind');
// Añadir formatos
addFormats(ajv);
addErrors(ajv);
const validateSchema = ajv.compile(UserDTOSchema);
const userDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body);
    if (!isDTOValid) {
        const errors = validateSchema.errors ?? [];
        return res.status(400).send({
            errors: errors.map((error) => error.message),
        });
    }
    next();
};
export default userDTO;
//# sourceMappingURL=userDTO.js.map