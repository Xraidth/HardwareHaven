// compra.types.ts
import { Type } from "@sinclair/typebox";
export const CompraDTOSchema = Type.Object({
    userId: Type.Optional(Type.Number({
        minimum: 0,
        errorMessage: {
            type: 'El tipo de userId no es válido, debe ser un número',
            minimum: 'El valor debe ser mayor o igual a 0',
        }
    })),
    fechaCompra: Type.Optional(Type.String({
        errorMessage: {
            type: 'La fecha de compra debe ser una cadena',
            format: 'El formato de la fecha de compra no es válido',
        }
    })),
    fechaCancel: Type.Optional(Type.String({
        errorMessage: {
            type: 'La fecha de cancelación debe ser una cadena',
            format: 'El formato de la fecha de cancelación no es válido',
        }
    })),
    total: Type.Optional(Type.Number({
        minimum: 0,
        errorMessage: {
            type: 'El total debe ser un número',
            minimum: 'El total no puede ser negativo',
        }
    })),
}, { additionalProperties: true });
//# sourceMappingURL=compra-typesSchema.js.map