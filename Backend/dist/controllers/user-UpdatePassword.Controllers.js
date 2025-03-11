import { UserRepository } from "../repository/userRepository.js";
import { jwtConstructor } from '../shared/db/jwt.js';
const userRepo = new UserRepository();
const userUpdatePasswordController = async (req, res) => {
    const { newPassword, oldPassword } = req.body;
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
        if (user.password !== oldPassword) {
            res.status(404).json({
                data: undefined,
                message: 'User incorrect credentials'
            });
            return;
        }
        const user_updated = await userRepo.updatePassword(user, newPassword);
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
export default userUpdatePasswordController;
//# sourceMappingURL=user-UpdatePassword.Controllers.js.map