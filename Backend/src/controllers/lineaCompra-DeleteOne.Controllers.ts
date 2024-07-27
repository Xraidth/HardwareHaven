import { Request, Response } from 'express';
import { LineaCompraRepository } from '../repository/lineaCompraRepository.js';
import { CompraRepository } from '../repository/compraRepository.js';



const lineaCompraRepo = new LineaCompraRepository();
const compraRepo = new CompraRepository();

const lineaCompraDeleteOneController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        
        const lineaCompra = await lineaCompraRepo.findOne({id:id});

        if (lineaCompra) {
            if(!lineaCompra.id||!lineaCompra.compra.id){
                res.status(404).json({
                    data: undefined,
                    message: 'lineaCompra incorrect credentials'
                });
                return;
            }
        const lineaCompra_deleted = await lineaCompraRepo.delete({id:lineaCompra.id});
        res.status(200).json({
        data: lineaCompra_deleted,
        message: "The lineaCompra was deleted"
        });

        const compra = lineaCompra.compra
        await compraRepo.calculateTotal(compra); 
        return

        } 
        else {
            res.status(404).json({
                data: undefined,
                message: 'lineaCompra incorrect credentials'
            });
            return;
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

export default lineaCompraDeleteOneController;