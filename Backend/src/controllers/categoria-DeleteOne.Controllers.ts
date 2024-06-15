import { Request, Response } from 'express';
import { CategoriaRepository } from '../repository/catergoriaRespository.js';


const categoriaRepo = new CategoriaRepository();

const categoriaDeleteOneController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const categoria = await categoriaRepo.findOne({id: id});
        if (categoria) {
                const categoria_deleted = await categoriaRepo.delete({id:id});
                res.status(200).json({
                    data: categoria_deleted,
                    message: "The categoria was deleted"
                });
        } else {
            res.status(404).json({
                data: undefined,
                message: 'categoria incorrect credentials'
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

export default categoriaDeleteOneController;