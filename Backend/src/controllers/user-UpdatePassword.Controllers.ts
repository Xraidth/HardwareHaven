import { Request, Response } from 'express';
import { UserRepository } from "../repository/userRepository.js";
import { User } from '../model/user.entity.js';

const userRepo = new UserRepository();

const userUpdatePasswordController = async (req: Request, res: Response): Promise<void> => {       
    const {newPassword, oldPassword} = req.body; 
    const id =  parseInt(req.params.id);

    try{
        const user = await userRepo.findOne({id: id});

       
        if (user) {
            
            if(user.password === oldPassword){
                const user_updated = await userRepo.updatePassword(user, newPassword);
                res.status(200).json({
                    data: user_updated,
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