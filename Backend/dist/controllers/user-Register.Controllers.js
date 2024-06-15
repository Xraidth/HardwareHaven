import { UserRepository } from "../repository/userRepository.js";
import { User } from '../model/user.entity.js';
const userRepo = new UserRepository();
const userRegisterController = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await userRepo.findName({ name: name });
        if (!user) {
            const new_user = new User(name, password);
            userRepo.add(new_user);
            res.status(201).json({
                data: new_user,
                message: "The user was added"
            });
        }
        else {
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
export default userRegisterController;
//# sourceMappingURL=user-Register.Controllers.js.map