import { Request, Response } from 'express';

import { PrecioRepository } from '../repository/precioRespository.js';



const precioRepo = new PrecioRepository();



const precioDeleteOneController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        
        const precio = await precioRepo.findOne({id:id});
        if (precio) {
                const precio_deleted = await precioRepo.delete({id:id});
                res.status(200).json({
                    data: precio_deleted,
                    message: "The precio was deleted"
                });
        } else {
            res.status(404).json({
                data: undefined,
                message: 'precio incorrect credentials'
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

export default precioDeleteOneController;