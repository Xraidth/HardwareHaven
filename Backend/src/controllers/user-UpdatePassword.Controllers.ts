import { Request, Response } from 'express';
import { UserRepository } from "../repository/userRepository.js";
import { User } from '../model/user.entity.js';
import { jwtConstructor } from '../shared/db/jwt.js';
import { CustomRequest } from '../Interfaces/interfaces.js';

const userRepo = new UserRepository();

const userUpdatePasswordController = async (req: CustomRequest, res: Response): Promise<void> => {       
    const {newPassword, oldPassword} = req.body; 
    const id = req.id; 

    try{
        if(!id)  {res.status(400).send('Solicitud inválida: El ID del usuario es obligatorio.');return;}
        const user = await userRepo.findOne({id: id});

       
        if (user) {
            
            if(user.password === oldPassword){
                const user_updated = await userRepo.updatePassword(user, newPassword);
                const jwt = await jwtConstructor(user_updated);
                res.status(200).json({
                    jwt,
                    data: undefined,
                    message: "The user was updated"
                });
            }
            else{
                res.status(404).json({
                    data: undefined,
                    message: 'User incorrect credentials'
                });
            }
                      


        } else {
            res.status(404).json({
                data: undefined,
                message: 'User incorrect credentials'
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

export default userUpdatePasswordController;