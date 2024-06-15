import { UserRepository } from "../repository/userRepository.js";
const userRepo = new UserRepository();
const userDeleteOneController = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await userRepo.findOne({ id: id });
        if (user) {
            const user_deleted = await userRepo.delete({ id: id });
            res.status(200).json({
                data: user_deleted,
                message: "The user was deleted"
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
export default userDeleteOneController;
//# sourceMappingURL=user-DeleteOne.Controllers.js.map