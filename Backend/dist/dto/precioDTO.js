import { PrecioDTOSchema } from '../lib/precio-typesSchema.js';
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
const ajv = new Ajv({ allErrors: true }).addKeyword('kind');
addFormats(ajv, ['date-time']);
addErrors(ajv);
const validateSchema = ajv.compile(PrecioDTOSchema);
const precioDTO = (req, res, next) => {
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
//# sourceMappingURL=precioDTO.js.map