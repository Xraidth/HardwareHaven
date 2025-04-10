// user.types.ts
import { Type } from "@sinclair/typebox";
export const UserDTOSchema = Type.Object({
    name: Type.Optional(Type.String({
        minLength: 2,
        maxLength: 20,
        errorMessage: {
            minLength: 'El nombre debe tener al menos 2 caracteres de longitud',
            maxLength: 'El nombre debe tener como máximo 20 caracteres de longitud',
        }
    })),
    password: Type.Optional(Type.String({
        minLength: 8,
        maxLength: 25,
        errorMessage: {
            minLength: 'La contraseña debe tener al menos 8 caracteres de longitud',
            maxLength: 'La contraseña debe tener como máximo 25 caracteres de longitud',
        }
    })),
    email: Type.Optional(Type.String({
        format: 'email',
        errorMessage: {
            format: 'El email debe tener un formato válido',
        }
    })),
    tipoUsuario: Type.Optional(Type.Union([
        Type.Literal("Administrador"),
        Type.Literal("Cliente")
    ])),
    fechaNac: Type.Optional(Type.String({
        errorMessage: {
            type: 'El tipo de fecha desde no es válido, debe ser una cadena en formato de fecha',
            format: 'El formato de fecha desde no es válido',
        }
    })),
    sexo: Type.Optional(Type.Union([
        Type.Literal("M"),
        Type.Literal("F")
    ])),
    direccion: Type.Optional(Type.String({
        minLength: 2,
        maxLength: 20,
        errorMessage: {
            minLength: 'La direccion debe tener al menos 2 caracteres de longitud',
            maxLength: 'La direccion debe tener como máximo 20 caracteres de longitud',
        }
    })),
    newPassword: Type.Optional(Type.String({
        minLength: 8,
        maxLength: 25,
        errorMessage: {
            minLength: 'La nueva contraseña debe tener al menos 8 caracteres de longitud',
            maxLength: 'La nueva contraseña debe tener como máximo 25 caracteres de longitud',
        }
    })),
    oldPassword: Type.Optional(Type.String({
        minLength: 8,
        maxLength: 25,
        errorMessage: {
            minLength: 'La contraseña antigua debe tener al menos 8 caracteres de longitud',
            maxLength: 'La contraseña antigua debe tener como máximo 25 caracteres de longitud',
        }
    })),
    newUserName: Type.Optional(Type.String({
        minLength: 2,
        maxLength: 20,
        errorMessage: {
            minLength: 'El nuevo nombre debe tener al menos 2 caracteres de longitud',
            maxLength: 'El nuevo nombre debe tener como máximo 20 caracteres de longitud',
        }
    })),
    newUserType: Type.Optional(Type.Union([
        Type.Literal("Administrador"),
        Type.Literal("Cliente")
    ])),
    newBirthDate: Type.Optional(Type.String({
        errorMessage: {
            type: 'El tipo de fecha desde no es válido, debe ser una cadena en formato de fecha',
            format: 'El formato de fecha desde no es válido',
        }
    })),
    newSex: Type.Optional(Type.Union([
        Type.Literal("M"),
        Type.Literal("F")
    ])),
    newAddress: Type.Optional(Type.String({
        minLength: 2,
        maxLength: 20,
        errorMessage: {
            minLength: 'La direccion debe tener al menos 2 caracteres de longitud',
            maxLength: 'La direccion debe tener como máximo 20 caracteres de longitud',
        }
    })),
}, { additionalProperties: true });
//# sourceMappingURL=user-typesSchema.js.map