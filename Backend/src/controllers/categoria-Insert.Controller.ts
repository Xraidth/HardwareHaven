import { Request, Response } from 'express';
import { CategoriaRepository } from '../repository/catergoriaRespository.js';
import { Categoria } from '../model/categoria.entity.js';
import { ComponenteRepository } from '../repository/componenteRepository.js';



const categoriaRepo = new CategoriaRepository();
const componenteRepo = new ComponenteRepository();

const categoriaInsertController = async (req: Request, res: Response): Promise<void> => {       
    const {descripcion} = req.body; 

    try{

        const categoria = await categoriaRepo.findByDescription(descripcion);
        
     if (!categoria) {
            
             const new_categoria = new Categoria(descripcion);
               categoriaRepo.add(new_categoria);
               res.status(201).json({
                    data: new_categoria,
                    message: "The categoria was added"
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
}

export default categoriaInsertController;


      