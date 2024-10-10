import { Request, Response } from 'express';
import { CompraRepository } from '../repository/compraRepository.js';
import { Compra } from '../model/compra.entity.js';
import { UserRepository } from '../repository/userRepository.js';
import { CustomRequest } from '../Interfaces/interfaces.js';


const compraRepo = new CompraRepository();
const userRepo = new UserRepository();

const compraInsertController = async (req: CustomRequest, res: Response): Promise<void> => {       
    const id = req.id; 

    try {
        if(!id)  {res.status(400).send('Solicitud inválida: El ID del usuario es obligatorio.');return;}

        const user = await userRepo.findOne({ id: id });

        if (!user) {
            res.status(404).json({
                data: undefined,
                message: "Error in compra data"
            });
            return; 
        }

        const new_compra = new Compra(user);
        const createdCompra = await compraRepo.add(new_compra); 

        if (!createdCompra) {
            res.status(500).json({
                data: undefined,
                message: "Failed to add compra"
            });
            return;
        }

        res.status(201).json({
            data: createdCompra, 
            message: "The compra was added"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            data: undefined,
            message: 'There was a server error'
        });
    }     
};

export default compraInsertController;


      