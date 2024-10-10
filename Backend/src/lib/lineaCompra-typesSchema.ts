import { Type } from "@sinclair/typebox";
export const LineaCompraDTOSchema = Type.Object(
    {
       nroLinea: 
       Type.Optional( 
       Type.Number({
        minimum: 1,
        errorMessage: {
        type: 'El número de línea debe ser un número',
        minimum: 'El número de línea debe ser al menos 1',
                }
       })),    
      cantidad: 
      Type.Optional( 
      Type.Number({
        minimum: 1,
        errorMessage: {
          type: "La cantidad debe ser un número",
          minimum: "La cantidad debe ser al menos 1",
        },
      })),
      subTotal: 
      Type.Optional( 
      Type.Optional(Type.Number({
        errorMessage: {
          type: "El subtotal debe ser un número",
        },
      }))),
      compraId: 
      Type.Optional( 
      Type.Number({ 
        minimum: 0, 
        errorMessage: {
            type: 'El tipo de compraId no es válido, debe ser un número',
            minimum: 'El valor debe ser mayor o igual a 0',
        }
    })), 
      componenteId: 
      Type.Optional( 
      Type.Number({ 
        minimum: 0, 
        errorMessage: {
            type: 'El tipo de componenteId no es válido, debe ser un número',
            minimum: 'El valor debe ser mayor o igual a 0',
        }
    })), 
    },
    { additionalProperties: true }
  );