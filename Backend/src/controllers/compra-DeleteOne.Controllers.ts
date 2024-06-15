import { Request, Response } from 'express';
import { CompraRepository } from '../repository/compraRepository.js';

const compraRepo = new CompraRepository();

const compraDeleteOneController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const compra = await compraRepo.findOne({id: id});
        if (compra) {
                const compra_deleted = await compraRepo.delete({id:id});
                res.status(200).json({
                    data: compra_deleted,
                    message: "The Compra was deleted"
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

export default compraDeleteOneController;