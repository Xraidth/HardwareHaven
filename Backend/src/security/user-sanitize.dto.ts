import { Request, Response, NextFunction } from 'express';

export function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
  
    if (!req.body || typeof req.body !== 'object') {
      return next();
    }

    req.body.sanitizedUser = {
        name: req.body.nameUser,
        password: req.body.password,
        newPassword:req.body.newPassword,
        oldPassword:req.body.oldPassword,
        newUserName:req.body.newUserName
      };
  
    Object.keys(req.body.sanitizedUser).forEach((key) => {
        if (req.body.sanitizedUser[key] === undefined) {
          delete req.body.sanitizedUser[key];
        }
      });
    
      next();
    }
