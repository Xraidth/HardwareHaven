import { CompraRepository } from '../repository/compraRepository.js';
const compraRepo = new CompraRepository();
const compraGetOneController = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const compra = await compraRepo.findOne({ id: id });
        if (compra) {
            res.status(200).json({
                data: compra,
                message: "The Compra"
            });
        }
        else {
            res.status(404).json({
                data: undefined,
                message: 'Compra not found'
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
export default compraGetOneController;
//# sourceMappingURL=compra-GetOne.Controller.js.map