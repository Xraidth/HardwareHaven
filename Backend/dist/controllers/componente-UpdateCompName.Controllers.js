import { ComponenteRepository } from "../repository/componenteRepository.js";
const compRepo = new ComponenteRepository();
const compUpdateCompNameController = async (req, res) => {
    const { newCompName } = req.body;
    const id = parseInt(req.params.id);
    try {
        const comp = await compRepo.findOne({ id });
        if (comp) {
            const comp_updated = await compRepo.updateCompName(comp, newCompName);
            res.status(200).json({
                data: comp_updated,
                message: "The component was updated"
            });
        }
        else {
            res.status(404).json({
                data: undefined
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
export default compUpdateCompNameController;
//# sourceMappingURL=componente-UpdateCompName.Controllers.js.map