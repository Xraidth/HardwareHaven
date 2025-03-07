import { Request, Response } from 'express';
import { CompraRepository } from '../repository/compraRepository.js';
import { CustomRequest } from '../Interfaces/interfaces.js';


const compraRepo = new CompraRepository();

const getMyPurchasesController = async (req: CustomRequest, res: Response): Promise<void> => { 
    const id = req.id;
    try {

        if(!id)  {res.status(400).send('Invalid request: User ID is required');return;}
        const compras = await compraRepo.getPurchasesOfUser(id);
        
        if(compras!=undefined){
        res.status(200).json(
            {
             data: compras,
             message:"All your purchases"
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

export default getMyPurchasesController;
