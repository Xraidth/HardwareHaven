import { Request, Response } from 'express';
import { CompraRepository } from '../repository/compraRepository.js';
import { copiarFactura, generateInvoicePDF} from '../services/invoiceService.js'
import { sendInvoiceEmail } from '../services/emailService.js';

const compraRepo = new CompraRepository();

const compraFacturationController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const compra = await compraRepo.findOne({id: id});

        if (compra) {
            const filePath = await generateInvoicePDF(compra);
            compra.id &&  copiarFactura(compra.id);
           // await sendInvoiceEmail(compra.user.email, filePath);

            //Falta actualizar el estado de la compra a facturada si es que se quiere facturar una sola vez

            res.status(200).json({
                data: compra,
                message: "The Compra was facturated and sent by email"
            });
        } else {
            res.status(404).json({
                data: undefined,
                message: 'Compra not found'
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

export default compraFacturationController;