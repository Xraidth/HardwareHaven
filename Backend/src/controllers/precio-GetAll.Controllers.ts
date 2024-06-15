import { Request, Response } from 'express';
import { PrecioRepository } from '../repository/precioRespository.js';

const precioRepo = new PrecioRepository();

const precioGetAllController = async (req: Request, res: Response): Promise<void> => {    
    try {
        const precios = await precioRepo.findAll();
        
        if(precios!=undefined){
        res.status(200).json(
            {
             data: precios,
             message:"All the precios"
            }
        );
        }
        else{
            res.status(500).json(
                {
                data: undefined,
                message:'There was a connection error with Hardware Haven database'
                }
                
            );
        }   
        
        
    } catch (error) {
        
        res.status(500).json(
            {
            data: undefined,
            message:'There was a connection error with Hardware Haven database'
            }
            
        ); 
    }      
};

export default precioGetAllController;
