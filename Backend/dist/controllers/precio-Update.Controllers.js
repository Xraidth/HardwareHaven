import { PrecioRepository } from '../repository/precioRespository.js';
import { ComponenteRepository } from '../repository/componenteRepository.js';
const precioRepo = new PrecioRepository();
const componenteRepo = new ComponenteRepository();
const precioUpdateController = async (req, res) => {
    const id = parseInt(req.params.id);
    const { fechaDesde, componenteId, valor } = req.body;
    try {
        const componente = await componenteRepo.findOne({ id: componenteId });
        const precio = await precioRepo.findOne({ id: id });
        if (precio) {
            precio.valor = valor;
            const precio_updated = await precioRepo.update(precio);
            res.status(200).json({
                data: precio_updated,
                message: "The precio was updated"
            });
        }
        else {
            res.status(404).json({
                data: undefined,
                message: 'precio incorrect credentials'
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
export default precioUpdateController;
//# sourceMappingURL=precio-Update.Controllers.js.map