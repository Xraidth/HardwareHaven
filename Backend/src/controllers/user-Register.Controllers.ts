import { Request, Response } from 'express';
import { UserRepository } from "../repository/userRepository.js";
import { User } from '../Model/user.entity.js';

const userRepo = new UserRepository();

const userRegisterController = async (req: Request, res: Response): Promise<void> => {       
    const {name, password, email, tipoUsuario} = req.body; 
    const mail = await userRepo.findEmail({email: email});

    try{
        const user = await userRepo.findName({name: name});
        const mail = await userRepo.findEmail({email: email});

        console.log(mail);

        if (!user && !mail) {
            const new_user = new User(name, password, email, tipoUsuario);
           userRepo.add(new_user);
           res.status(201).json({
                data: new_user,
                message: "The user was added"
            });
        } else {
            res.status(404).json({
                data: undefined,
                message: 'El usuario o el email ya se escuentran registrados.'
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

export default userRegisterController;


      