import { jwtVerify } from "jose";
import { NextFunction, Request, Response } from "express";


interface CustomRequest extends Request {
    id?: string;  
    tipoUsuario?: string; 
  }

interface Payload {
  id: string; 
  tipoUsuario: string; 
}

const userJWTDTO = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send('Usuario no autorizado');

  const jwt = authorization.split(' ')[1];
  if (!jwt) return res.status(401).send('Usuario no autorizado');

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      jwt, 
      encoder.encode(process.env.JWT_PRIVATE_KEY as string)
    ) as { payload: Payload }; 

   
    if (!['administrador', 'cliente'].includes(payload.tipoUsuario)) {
        return res.status(403).send('Acceso denegado'); 
    }
    
    req.id = payload.id;
    req.tipoUsuario = payload.tipoUsuario; 

    next();
  } catch (error) {
    console.error('JWT verification error:', error); 
    return res.status(401).send('Usuario no autorizado');
  }
};

export default userJWTDTO;
