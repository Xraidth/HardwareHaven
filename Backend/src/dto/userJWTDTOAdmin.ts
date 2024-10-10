import { jwtVerify } from "jose";
import { NextFunction, Request, Response } from "express";
import { CustomRequest, Payload } from "../Interfaces/interfaces";




const userJWTDTOAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send('Usuario no autorizado "No hay autorization" ');

  const jwt = authorization.split(' ')[1];
  if (!jwt) return res.status(401).send('Usuario no autorizado "No hay jwt"');

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      jwt, 
      encoder.encode(process.env.JWT_PRIVATE_KEY as string)
    ) as { payload: Payload }; 

    if(!payload.tipoUsuario) return res.status(500).send('Erro interno "Erro al momento de crear o leer el tipo de usuario"');
    if (!['Administrador'].includes(payload.tipoUsuario)) {
        return res.status(403).send('Acceso denegado por tipo de usuario'); 
    }
    
    req.id = Number(payload.id);
    req.tipoUsuario = payload.tipoUsuario; 

    next();
  } catch (error) {
    console.error('JWT verification error:', error); 
    return res.status(401).send('Usuario no autorizado "JWT"');
  }
};

export default userJWTDTOAdmin;
