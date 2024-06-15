import { Request, Response } from 'express';
import { ComponenteRepository } from "../repository/componenteRepository.js";
import { Componente} from '../model/componente.entity.js';

const compRepo = new ComponenteRepository();

const compDeleteOneController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const comp= await compRepo.findOne({id: id});
        if (comp) {
                const comp_deleted = await compRepo.delete({id:id});
                res.status(200).json({
                    data: comp_deleted,
                    message: "The component was deleted"
                });
        } else {
            res.status(404).json({
                data: undefined
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

export default compDeleteOneController;