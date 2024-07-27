import { Request, Response } from 'express';
import { ComponenteRepository } from "../repository/componenteRepository.js";

const compRepo = new ComponenteRepository();

const compGetOneController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const comp = await compRepo.findOne({id: id});

        if (comp) {
            res.status(200).json({
                data: comp,
                message: "The component"
            });
        } else {
            res.status(404).json({
                data: undefined,
                message: 'Component not found'
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

export default compGetOneController;
