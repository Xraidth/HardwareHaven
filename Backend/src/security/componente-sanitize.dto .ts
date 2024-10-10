import { Response, NextFunction } from 'express';
import { CustomRequest } from '../Interfaces/interfaces';

export function sanitizeComponenteInput(req: CustomRequest, res: Response, next: NextFunction) {
  
    if (!req.body || typeof req.body !== 'object') {
      return next();
    }
    req.body.sanitizedComponente = {
        name:req.body.name,
        description:req.body.description,
        newCompName:req.body.newCompName,
        newDescription:req.body.newDescription,
        oldDescription:req.body.oldDescription,
        
      };
  
    Object.keys(req.body.sanitizedComponente).forEach((key) => {
        if (req.body.sanitizedComponente[key] === undefined) {
          delete req.body.sanitizedComponente[key];
        }
      });
    
      next();
    }
