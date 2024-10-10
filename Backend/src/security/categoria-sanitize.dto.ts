import { Response, NextFunction } from 'express';
import { CustomRequest } from '../Interfaces/interfaces';

export function sanitizeCategoriaInput(req: CustomRequest, res: Response, next: NextFunction) {
  
    if (!req.body || typeof req.body !== 'object') {
      return next();
    }
    req.body.sanitizedCategoria = {
        categoriaId: req.body.categoriaId,
        descripcion: req.body.descripcion,
        componenteId: req.body.componenteId
      };
  
    Object.keys(req.body.sanitizedCategoria).forEach((key) => {
        if (req.body.sanitizedCategoria[key] === undefined) {
          delete req.body.sanitizedCategoria[key];
        }
      });
    
      next();
    }
