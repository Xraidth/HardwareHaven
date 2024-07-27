import { LineaCompraRepository } from '../repository/lineaCompraRepository.js';
const lineaCompraRepo = new LineaCompraRepository();
const lineaCompraGetOneController = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const lineaCompra = await lineaCompraRepo.findOne({ id: id });
        if (lineaCompra) {
            res.status(200).json({
                data: lineaCompra,
                message: "The LineaCompra"
            });
        }
        else {
            res.status(404).json({
                data: undefined,
                message: 'LineaCompra not found'
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
export default lineaCompraGetOneController;
//# sourceMappingURL=lineaCompra-GetOne.Controller.js.map