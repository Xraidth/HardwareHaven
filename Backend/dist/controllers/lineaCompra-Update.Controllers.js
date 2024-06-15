import { CompraRepository } from '../repository/compraRepository.js';
import { LineaCompraRepository } from '../repository/lineaCompraRepository.js';
import { ComponenteRepository } from '../repository/componenteRepository.js';
const compraRepo = new CompraRepository();
const lineaCompraRepo = new LineaCompraRepository();
const componenteRepo = new ComponenteRepository();
const lineaCompraUpdateController = async (req, res) => {
    const id = parseInt(req.params.id);
    const { compraId, cantidad, subTotal, componenteId } = req.body;
    try {
        const compra = await compraRepo.findOne({ id: compraId });
        const lineaCompra = await lineaCompraRepo.findOne({ id: id });
        const componente = await componenteRepo.findOne({ id: componenteId });
        if (compra && lineaCompra && componente) {
            lineaCompra.cantidad = cantidad;
            lineaCompra.subTotal = subTotal;
            lineaCompra.compra = compra;
            lineaCompra.componente = componente;
            const lineaCompra_updated = await lineaCompraRepo.update(lineaCompra);
            res.status(200).json({
                data: lineaCompra_updated,
                message: "The lineaCompra was updated"
            });
            await compraRepo.calculateTotal(compra);
        }
        else {
            res.status(404).json({
                data: undefined,
                message: 'lineaCompra incorrect credentials'
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
export default lineaCompraUpdateController;
//# sourceMappingURL=lineaCompra-Update.Controllers.js.map