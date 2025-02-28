import { Request, Response } from 'express';
import { CompraRepository } from '../repository/compraRepository.js';

const compraRepo = new CompraRepository();

const cancelPurchaseController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const compra = await compraRepo.findOne({id: id});
        if (compra) {
            
                const today = new Date();                
                const compra_updated = await compraRepo.updateFechaCancel(compra, today);
                res.status(200).json({
                    data: compra_updated,
                    message: "The purchase was cancelled"
                });

        } else {
            res.status(404).json({
                data: undefined,
                message: 'Purchase incorrect credentials'
            });
        }

    }
    catch (error) {
        console.error(error);
         res.status(500).json({
            data: undefined,
            message: 'There was a server error'
        });
    }     
};

export default cancelPurchaseController;