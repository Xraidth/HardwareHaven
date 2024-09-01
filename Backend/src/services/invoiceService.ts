import PDFDocument from 'pdfkit';
import fs from 'fs';
import { ComponenteRepository } from '../repository/componenteRepository.js'; // Suponiendo que tienes un repositorio para Componentes

const componenteRepo = new ComponenteRepository();

export const generateInvoicePDF = async (compra: any): Promise<string> => {
    const doc = new PDFDocument();
    const filePath = `./facturas/factura_${compra.id}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text(`Factura de Compra: N°${compra.id}`, 100, 80);
    doc.fontSize(12).text(`Cliente: ${compra.user.name}`, 100, 130);

    // Encabezados de la tabla
    doc.fontSize(16).text('Producto', 100, 180);
    doc.text('Cantidad', 300, 180);
    doc.text('Subtotal', 400, 180);

    // Línea separadora debajo de los encabezados
    doc.moveTo(100, 200).lineTo(500, 200).stroke();

    // Detalles de las compras
    let y = 220; 
    for (const line of compra.lineasCompras) {
        // Consultar el componente por su ID
        const componente = await componenteRepo.findOne({id: line.componente.id}); // Suponiendo que `componenteId` está disponible
        
        doc.text(`${line.componente?.name || 'Componente no definido'}`, 100, y); // Columna de name componente
        doc.text(`x${line.cantidad}`, 300, y); // Columna de cantidad
        doc.text(`$${line.subTotal}`, 400, y); // Columna de subTotal
        y += 20; 
    }

    // Dibujar una línea horizontal antes del total
    doc.moveTo(100, y + 10)
       .lineTo(500, y + 10)
       .stroke();

    // Añadir el total debajo de la línea
    doc.fontSize(18).text(`Total: $${compra.total}`, 100, y + 30);

    doc.fontSize(10).text('Gracias por comprar en Hardware Haven.', 100, y + 70);
    doc.text('Nos esforzamos por ofrecer los mejores componentes de hardware para su PC personalizada.', 100, y + 85);
    doc.text('Para cualquier consulta o soporte, no dude en contactarnos a soporte@hardwarehaven.com.', 100, y + 100);
    doc.text('Visite nuestro sitio web para conocer nuestras últimas ofertas y productos.', 100, y + 115);


    doc.end();

    return filePath;
};
