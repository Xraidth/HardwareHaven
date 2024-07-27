import { Request, Response } from 'express';
import { CompraRepository } from '../repository/compraRepository.js';

const compraRepo = new CompraRepository();

const compraUpdateController = async (req: Request, res: Response): Promise<void> => {       
    const {fechaCompra, fechaCancel, total} = req.body; 
    const id =  parseInt(req.params.id);

    try{
        const compra = await compraRepo.findOne({id: id});

       
        if (compra) {
            
            
                compra.fechaCompra = fechaCompra;
                compra.fechaCancel = fechaCancel;
                compra.total = total;
                
                const compra_updated = await compraRepo.update(compra);
                res.status(200).json({
                    data: compra_updated,
                    message: "The Compra was updated"
                });
           
                      


        } else {
            res.status(404).json({
                data: undefined,
                message: 'Compra incorrect credentials'
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

export default compraUpdateController;