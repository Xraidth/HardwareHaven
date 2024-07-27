import { Request, Response } from 'express';
import { LineaCompraRepository } from '../repository/lineaCompraRepository.js';



const lineaCompraRepo = new LineaCompraRepository();

const lineaCompraGetAllController = async (req: Request, res: Response): Promise<void> => {    
    try {
        const lineaCompras = await lineaCompraRepo.findAll();
        
        if(lineaCompras!=undefined){
        res.status(200).json(
            {
             data: lineaCompras,
             message:"All the lineaCompras"
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

export default lineaCompraGetAllController;
