import { CategoriaRepository } from '../repository/catergoriaRespository.js';
const categoriaRepo = new CategoriaRepository();
const categoriaGetAllController = async (req, res) => {
    try {
        const categorias = await categoriaRepo.findAll();
        if (categorias != undefined) {
            res.status(200).json({
                data: categorias,
                message: "All the categorias"
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
export default categoriaGetAllController;
//# sourceMappingURL=categoria-GetAll.Controller.js.map