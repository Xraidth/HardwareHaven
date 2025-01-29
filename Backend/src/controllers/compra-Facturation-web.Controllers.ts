import { Request, Response } from 'express';
import { CompraRepository } from '../repository/compraRepository.js';
import { generateInvoicePDF} from '../services/invoiceService.js'
import path from 'path';
import fs from 'fs'; 
const compraRepo = new CompraRepository();

const compraFacturationWebController = async (req: Request, res: Response): Promise<void> => {       
    const id =  parseInt(req.params.id);

    try{
        const compra = await compraRepo.findOne({id: id});

        if (compra) {
            let filePath = await generateInvoicePDF(compra);
            
            if (!fs.existsSync(filePath)) {
                res.status(500).json({
                    data: undefined,
                    message: 'Generated PDF file does not exist',
                }); 
                return;
            }
            if (filePath) {
                filePath = path.resolve(process.cwd(), filePath); 
                res.setHeader('Content-Type', 'application/pdf'); 
                res.setHeader('Content-Disposition', `inline; filename=factura-${id}.pdf`); 
                res.sendFile(filePath); 
            } else {
                res.status(500).json({
                    data: undefined,
                    message: 'Failed to generate PDF',
                });
                return;
            }
        } else {
            res.status(404).json({
                data: undefined,
                message: 'Compra not found'
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
        return;
    }     
};

export default compraFacturationWebController;