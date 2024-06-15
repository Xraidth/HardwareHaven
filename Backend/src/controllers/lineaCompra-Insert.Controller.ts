import { Request, Response } from 'express';
import { CompraRepository } from '../repository/compraRepository.js';
import { LineaCompra } from '../model/lineaCompra.entity.js';
import { LineaCompraRepository } from '../repository/lineaCompraRepository.js';
import { ComponenteRepository } from '../repository/componenteRepository.js';
import { Precio } from '../model/precio.entity.js';


const compraRepo = new CompraRepository();
const lineaCompraRepo = new LineaCompraRepository();
const componenteRepo = new ComponenteRepository();

const lineaCompraInsertController = async (req: Request, res: Response): Promise<void> => {       
    const {compraId, cantidad,componenteId} = req.body; 

    try{
        const componente = await componenteRepo.findOne({id: componenteId});
        const compra = await compraRepo.findOne({id: compraId});

        if(!compra||!componente){
            res.status(404).json({
                data: undefined,
                message: "Error in lineaCompra data"
                    });
        return; 
        }

        const lineaCompra = compra.lineasCompras.find(linea => linea.componente.id === componente.id);
        
        if(!lineaCompra){
        const new_lineaCompra = new LineaCompra(cantidad, compra, componente);
        
        const precioCompActual = componente.precios.reduce((prev:Precio, current:Precio) => 
        (prev.fechaDesde > current.fechaDesde) ? prev : current);

        if(precioCompActual && precioCompActual.valor){
            new_lineaCompra.subTotal = (new_lineaCompra.cantidad * precioCompActual.valor)
        }
        else{new_lineaCompra.subTotal = 0;}
        
        const lineaCompraAdded = await lineaCompraRepo.add(new_lineaCompra);

        if(!lineaCompraAdded){
            res.status(500).json({
                data: undefined,
                message: 'There was a server error'
            });
            return

        }
        
        res.status(201).json({
        data: lineaCompraAdded,
        message: "The lineaCompra was added"
            });
        }
        
        else{

            const precioCompActual = componente.precios.reduce((prev:Precio, current:Precio) => 
                (prev.fechaDesde > current.fechaDesde) ? prev : current);
        
                if(precioCompActual && precioCompActual.valor){
                    lineaCompra.subTotal = ((lineaCompra.cantidad + parseInt(cantidad)) * precioCompActual.valor)
                }
                else{lineaCompra.subTotal = 0;}
                
            await lineaCompraRepo.updateCantidad(lineaCompra, lineaCompra.cantidad + parseInt(cantidad))
            res.status(200).json({
                data: lineaCompra,
                message: "The lineaCompra already exists and it was updated"
                    });
                    

        }
        await compraRepo.calculateTotal(compra); 
        return;
    }
    catch (error) {
        console.error(error);
         res.status(500).json({
            data: undefined,
            message: 'There was a server error'
        });
        return
    }     
};

export default lineaCompraInsertController;


      