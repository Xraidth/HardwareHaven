import { CompraRepository } from '../repository/compraRepository.js';
import { Compra } from '../model/compra.entity.js';
import { UserRepository } from '../repository/userRepository.js';
const compraRepo = new CompraRepository();
const userRepo = new UserRepository();
const compraInsertController = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await userRepo.findOne({ id: userId });
        if (!user) {
            res.status(404).json({
                data: undefined,
                message: "Error in compra data"
            });
            return;
        }
        const new_compra = new Compra(user);
        compraRepo.add(new_compra);
        res.status(201).json({
            data: new_compra,
            message: "The compra was added"
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
export default compraInsertController;
//# sourceMappingURL=compra-Insert.Controller.js.map