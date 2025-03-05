// componente.types.ts
import { Type } from "@sinclair/typebox";
export const ComponenteDTOSchema = Type.Object({
    name: Type.Optional(Type.String({
        minLength: 2,
        maxLength: 50,
        errorMessage: {
            minLength: 'El nombre debe tener al menos 2 caracteres de longitud',
            maxLength: 'El nombre debe tener como máximo 50 caracteres de longitud',
        }
    })),
    description: Type.Optional(Type.String({
        minLength: 5,
        maxLength: 200,
        errorMessage: {
            minLength: 'La descripción debe tener al menos 5 caracteres de longitud',
            maxLength: 'La descripción debe tener como máximo 200 caracteres de longitud',
        }
    })),
    newCompName: Type.Optional(Type.String({
        minLength: 2,
        maxLength: 50,
        errorMessage: {
            minLength: 'El nuevo nombre debe tener al menos 2 caracteres de longitud',
            maxLength: 'El nuevo nombre debe tener como máximo 50 caracteres de longitud',
        }
    })),
    newDescription: Type.Optional(Type.String({
        minLength: 5,
        maxLength: 200,
        errorMessage: {
            minLength: 'La nueva descripción debe tener al menos 5 caracteres de longitud',
            maxLength: 'La nueva descripción debe tener como máximo 200 caracteres de longitud',
        }
    })),
    oldDescription: Type.Optional(Type.String({
        minLength: 5,
        maxLength: 200,
        errorMessage: {
            minLength: 'La descripción antigua debe tener al menos 5 caracteres de longitud',
            maxLength: 'La descripción antigua debe tener como máximo 200 caracteres de longitud',
        }
    })),
}, { additionalProperties: true });
//# sourceMappingURL=componente-typesSchema.js.map