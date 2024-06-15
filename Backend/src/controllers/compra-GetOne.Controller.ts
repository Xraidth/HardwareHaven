import { Request, Response } from 'express';
import { CompraRepository } from '../repository/compraRepository.js';


const compraRepo = new CompraRepository();

const compraGetOneController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const compra = await compraRepo.findOne({id: id});

        if (compra) {
            res.status(200).json({
                data: compra,
                message: "The Compra"
            });
        } else {
            res.status(404).json({
                data: undefined,
                message: 'Compra not found'
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

export default compraGetOneController;