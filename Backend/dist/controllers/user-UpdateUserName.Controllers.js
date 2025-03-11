import { UserRepository } from "../repository/userRepository.js";
import { jwtConstructor } from '../shared/db/jwt.js';
const userRepo = new UserRepository();
const userUpdateUserNameController = async (req, res) => {
    const { newUserName, password } = req.body;
    const id = req.id;
    try {
        if (!id) {
            res.status(400).send('Solicitud inválida: El ID del usuario es obligatorio.');
            return;
        }
        const user = await userRepo.findOne({ id });
        if (!user) {
            res.status(404).json({
                data: undefined,
                message: 'User incorrect credentials'
            });
            return;
        }
        if (user.password !== password) {
            res.status(404).json({
                data: undefined,
                message: 'User incorrect credentials'
            });
            return;
        }
        const existingUser = await userRepo.findName(newUserName);
        if (existingUser) {
            res.status(400).json({
                data: undefined,
                message: "Username already exists"
            });
            return;
        }
        const user_updated = await userRepo.updateUserName(user, newUserName);
        const jwt = await jwtConstructor(user_updated);
        res.status(200).json({
            jwt,
            data: undefined,
            message: "The user was updated"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            data: undefined,
            message: 'There was a server error'
        });
    }
};
export default userUpdateUserNameController;
//# sourceMappingURL=user-UpdateUserName.Controllers.js.map