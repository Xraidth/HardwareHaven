export function sanitizeLineaCompraInput(req, res, next) {
    if (!req.body || typeof req.body !== 'object') {
        return next();
    }
    req.body.sanitizedLineaCompra = {
        nroLinea: req.body.nroLinea,
        compraId: req.body.compraId,
        cantidad: req.body.cantidad,
        componenteId: req.body.componenteId,
        subTotal: req.body.subTotal,
    };
    Object.keys(req.body.sanitizedLineaCompra).forEach((key) => {
        if (req.body.sanitizedLineaCompra[key] === undefined) {
            delete req.body.sanitizedLineaCompra[key];
        }
    });
    next();
}
//# sourceMappingURL=lineaCompra-sanitize.dto.js.map