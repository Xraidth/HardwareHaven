import { Request, Response } from 'express';
import { UserRepository } from "../repository/userRepository.js";
import { User } from '../model/user.entity.js';

const userRepo = new UserRepository();

const userDeleteOneController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const user = await userRepo.findOne({id: id});
        if (user) {
                const user_deleted = await userRepo.delete({id:id});
                res.status(200).json({
                    data: user_deleted,
                    message: "The user was deleted"
                });
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

export default userDeleteOneController;