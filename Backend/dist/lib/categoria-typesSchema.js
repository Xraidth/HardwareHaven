// categoria.types.ts
import { Type } from "@sinclair/typebox";
// Esquema para Categoria
export const CategoriaDTOSchema = Type.Object({
    categoriaId: Type.Optional(Type.Number({
        minimum: 0,
        errorMessage: {
            type: 'El tipo de categoriaId no es válido, debe ser un número',
            minimum: 'El valor debe ser mayor o igual a 0',
        }
    })),
    descripcion: Type.Optional(Type.String({
        minLength: 5,
        maxLength: 100,
        errorMessage: {
            minLength: 'La descripción debe tener al menos 5 caracteres de longitud',
            maxLength: 'La descripción debe tener como máximo 100 caracteres de longitud',
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
//# sourceMappingURL=categoria-typesSchema.js.map