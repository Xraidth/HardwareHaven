import { UserRepository } from "../repository/userRepository.js";
const userRepo = new UserRepository();
const userGetAllController = async (req, res) => {
    try {
        const users = await userRepo.findAll();
        if (users != undefined) {
            res.status(200).json({
                data: users,
                message: "All the users"
            });
        }
        else {
            res.status(500).json({
                data: undefined,
                message: 'There was a connection error with Hardware Haven database'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            data: undefined,
            message: 'There was a connection error with Hardware Haven database'
        });
    }
};
export default userGetAllController;
//# sourceMappingURL=user-GetAll.Controllers.js.map