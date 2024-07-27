import { Request, Response, NextFunction } from 'express';

export function sanitizeCompraInput(req: Request, res: Response, next: NextFunction) {
  
    if (!req.body || typeof req.body !== 'object') {
      return next();
    }

    req.body.sanitizedCompra = {
        userId: req.body.userId,
        fechaCompra: req.body.fechaCompra,
        fechaCancel: req.body.fechaCancel,
        total: req.body.total,
        
      };
  
    Object.keys(req.body.sanitizedCompra).forEach((key) => {
        if (req.body.sanitizedCompra[key] === undefined) {
          delete req.body.sanitizedCompra[key];
        }
      });
    
      next();
    }
