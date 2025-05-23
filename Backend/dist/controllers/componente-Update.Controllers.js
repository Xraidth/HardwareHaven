import { ComponenteRepository } from "../repository/componenteRepository.js";
import { CategoriaRepository } from '../repository/catergoriaRespository.js';
const compRepo = new ComponenteRepository();
const categoriaRepo = new CategoriaRepository();
const compUpdateController = async (req, res) => {
    const { newCompName, newDescription, categoriaId, newImgURL } = req.body;
    const id = parseInt(req.params.id);
    try {
        const comp = await compRepo.findOne({ id: id });
        const categoria = await categoriaRepo.findOne({ id: categoriaId });
        if (comp && categoria) {
            if (comp.id === id) {
                comp.name = newCompName;
                comp.description = newDescription;
                comp.categoria = categoria;
                comp.imgURL = newImgURL;
                const comp_updated = await compRepo.update(comp);
                res.status(200).json({
                    data: comp_updated,
                    message: "The component was updated"
                });
            }
            else {
                res.status(404).json({
                    data: undefined,
                    message: 'Component incorrect credentials'
                });
            }
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
export default compUpdateController;
//# sourceMappingURL=componente-Update.Controllers.js.map