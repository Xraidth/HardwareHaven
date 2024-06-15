import { ComponenteRepository } from "../repository/componenteRepository.js";
const compRepo = new ComponenteRepository();
const compDeleteOneController = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const comp = await compRepo.findOne({ id: id });
        if (comp) {
            const comp_deleted = await compRepo.delete({ id: id });
            res.status(200).json({
                data: comp_deleted,
                message: "The component was deleted"
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
export default compDeleteOneController;
//# sourceMappingURL=componente-DeleteOne.Controllers.js.map