import { UserRepository } from "../repository/userRepository.js";
import { User } from '../model/user.entity.js';
import { jwtConstructor } from '../shared/db/jwt.js';
const userRepo = new UserRepository();
const userRegisterController = async (req, res) => {
    const { name, password, email, tipoUsuario } = req.body;
    try {
        const user = await userRepo.findName(name);
        if (!user) {
            const new_user = new User(name, password, email, tipoUsuario);
            userRepo.add(new_user);
            const usercreated = await userRepo.findName(name);
            const jwt = await jwtConstructor(usercreated);
            res.status(201).json({
                jwt,
                data: undefined,
                message: "The user was added"
            });
        }
        else {
            res.status(404).json({
                data: undefined,
                message: 'Credenciales incorrectas de usuario'
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