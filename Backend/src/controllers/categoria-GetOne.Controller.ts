import { Request, Response } from 'express';
import { CategoriaRepository } from '../repository/catergoriaRespository.js';



const categoriaRepo = new CategoriaRepository();

const categoriaGetOneController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const categoria = await categoriaRepo.findOne({id: id});

        if (categoria) {
            res.status(200).json({
                data: categoria,
                message: "The categoria"
            });
        } else {
            res.status(404).json({
                data: undefined,
                message: 'categoria not found'
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

export default categoriaGetOneController;