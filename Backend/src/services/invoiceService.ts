import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generateInvoicePDF = (compra: any): string => {
    const doc = new PDFDocument();
    const filePath = `./facturas/factura_${compra.id}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));
    
    doc.fontSize(25).text(`Factura de Compra: ${compra.id}`, 100, 80);
    doc.fontSize(18).text(`Cliente: ${compra.user.name}`, 100, 130);

    let y = 180; 
    for (const line of compra.lineasCompras) {
        doc.fontSize(14).text(`${line.componente.name} - ${line.cantidad} - $${line.subTotal}`, 100, y);
        y += 20; 
    }

    doc.fontSize(18).text(`Total: $${compra.total}`, 100, y + 30); 

    doc.end();

    return filePath;
};
