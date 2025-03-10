import { UserRepository } from "../repository/userRepository.js";
import { jwtConstructor } from '../shared/db/jwt.js';
const userRepo = new UserRepository();
const userUpdateController = async (req, res) => {
    const { newPassword, oldPassword, newUserName, newEmail, newUserType } = req.body;
    const id = parseInt(req.params.id);
    try {
        const user = await userRepo.findOne({ id: id });
        if (user) {
            if (user.password === oldPassword) {
                user.name = newUserName;
                user.password = newPassword;
                user.email = newEmail;
                user.tipoUsuario = newUserType;
                const user_updated = await userRepo.update(user);
                const jwt = await jwtConstructor(user_updated);
                res.status(200).json({
                    jwt,
                    data: undefined,
                    message: "The user was updated"
                });
            }
            else {
                res.status(404).json({
                    data: undefined,
                    message: 'User incorrect credentials'
                });
            }
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
export default userUpdateController;
//# sourceMappingURL=user-Update.Controllers.js.map