import { UserRepository } from "../repository/userRepository.js";
const userRepo = new UserRepository();
const userUpdateUserNameController = async (req, res) => {
    const { newUserName, password } = req.body;
    const id = parseInt(req.params.id);
    try {
        const user = await userRepo.findOne({ id });
        if (user) {
            if (user.password === password) {
                const user_updated = await userRepo.updateUserName(user, newUserName);
                res.status(200).json({
                    data: user_updated,
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
export default userUpdateUserNameController;
//# sourceMappingURL=user-UpdateUserName.Controllers.js.map