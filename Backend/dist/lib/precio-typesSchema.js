// precio.types.ts
import { Type } from "@sinclair/typebox";
export const PrecioDTOSchema = Type.Object({
    fechaDesde: Type.Optional(Type.String({
        errorMessage: {
            type: 'El tipo de fecha desde no es válido, debe ser una cadena en formato de fecha',
            format: 'El formato de fecha desde no es válido',
        }
    })),
    valor: Type.Optional(Type.Number({
        minimum: 0,
        errorMessage: {
            type: 'El tipo de valor no es válido, debe ser un número',
            minimum: 'El valor debe ser mayor o igual a 0',
        }
    })),
    componenteId: Type.Optional(Type.Number({
        minimum: 0,
        errorMessage: {
            type: 'El tipo de componenteId no es válido, debe ser un número',
            minimum: 'El valor debe ser mayor o igual a 0',
        }
    })),
}, { additionalProperties: true });
//# sourceMappingURL=precio-typesSchema.js.map