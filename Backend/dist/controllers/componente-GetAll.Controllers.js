import { ComponenteRepository } from "../repository/componenteRepository.js";
const compRepo = new ComponenteRepository();
const compGetAllController = async (req, res) => {
    try {
        const comps = await compRepo.findAll();
        if (comps != undefined) {
            res.status(200).json({
                data: comps,
                message: "All the components"
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
export default compGetAllController;
//# sourceMappingURL=componente-GetAll.Controllers.js.map