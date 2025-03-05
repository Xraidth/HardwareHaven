import nodemailer from 'nodemailer';
export const sendInvoiceEmail = async (email, filePath) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tuemail@gmail.com',
            pass: 'tucontraseña'
        }
    });
    const mailOptions = {
        from: 'tuemail@gmail.com',
        to: email,
        subject: 'Tu Factura',
        text: 'Adjunto encontrarás la factura de tu compra.',
        attachments: [
            {
                filename: 'factura.pdf',
                path: filePath
            }
        ]
    };
    await transporter.sendMail(mailOptions);
};
//# sourceMappingURL=emailService.js.map