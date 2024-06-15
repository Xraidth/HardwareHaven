import { CategoriaRepository } from '../repository/catergoriaRespository.js';
const categoriaRepo = new CategoriaRepository();
const categoriaUpdateController = async (req, res) => {
    const { descripcion, componenteId } = req.body;
    const categoriaId = parseInt(req.params.id);
    try {
        const categoria = await categoriaRepo.findOne({ id: categoriaId });
        if (categoria) {
            categoria.descripcion = descripcion;
            const categoria_updated = await categoriaRepo.update(categoria);
            res.status(200).json({
                data: categoria_updated,
                message: "The categoria was updated"
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
export default categoriaUpdateController;
//# sourceMappingURL=categoria-Update.Controllers.js.map