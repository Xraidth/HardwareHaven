import { PrecioRepository } from '../repository/precioRespository.js';
const precioRepo = new PrecioRepository();
const precioGetOneController = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const precio = await precioRepo.findOne({ id: id });
        if (precio) {
            res.status(200).json({
                data: precio,
                message: "The precio"
            });
        }
        else {
            res.status(404).json({
                data: undefined,
                message: 'precio not found'
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
export default precioGetOneController;
//# sourceMappingURL=precio-GetOne.Controllers.js.map