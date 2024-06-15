import { Request, Response } from 'express';
import { ComponenteRepository } from "../repository/componenteRepository.js";
import { Componente } from '../model/componente.entity.js';
import { CategoriaRepository } from '../repository/catergoriaRespository.js';

const compRepo = new ComponenteRepository();

const categoriaRepo = new CategoriaRepository();

const compInsertController = async (req: Request, res: Response): Promise<void> => {       
    const {name, description, categoriaId} = req.body; 

    try{
        const comp = await compRepo.findName({name: name});
        const categoria = await categoriaRepo.findOne({id: categoriaId});

        if (!comp && categoria) {
            const new_comp = new Componente(name, description, categoria);
            compRepo.add(new_comp);
            res.status(201).json({
                data: new_comp,
                message: "The component was added"
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

export default compInsertController;
