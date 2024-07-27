import { Request, Response } from 'express';
import { UserRepository } from "../repository/userRepository.js";

const userRepo = new UserRepository();

const userGetOneController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const user = await userRepo.findOne({id: id});

        if (user) {
            res.status(200).json({
                data: user,
                message: "The user"
            });
        } else {
            res.status(404).json({
                data: undefined,
                message: 'User not found'
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

export default userGetOneController;


      


