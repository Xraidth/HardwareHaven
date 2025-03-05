import { UserRepository } from "../repository/userRepository.js";
import { jwtConstructor } from '../shared/db/jwt.js';
const userRepo = new UserRepository();
const userLoginController = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await userRepo.findName(name);
        if (user) {
            const checkPassword = (password == user.password);
            if (!checkPassword) {
                return res.status(401).send('Credenciales incorrectas');
            }
            const jwt = await jwtConstructor(user);
            return res.status(200).json({
                jwt,
                data: undefined,
                message: "User logged in successfully"
            });
        }
        else {
            return res.status(401).json({
                data: undefined,
                message: 'Credenciales incorrectas'
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            data: undefined,
            message: 'There was a server error'
        });
    }
};
export default userLoginController;
//# sourceMappingURL=user-Login.Controllers.js.map