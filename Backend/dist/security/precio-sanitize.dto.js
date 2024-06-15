export function sanitizePrecioInput(req, res, next) {
    if (!req.body || typeof req.body !== 'object') {
        return next();
    }
    req.body.sanitizedPrecio = {
        fechaDesde: req.body.fechaDesde,
        componenteId: req.body.componenteId,
        valor: req.body.valor
    };
    Object.keys(req.body.sanitizedPrecio).forEach((key) => {
        if (req.body.sanitizedPrecio[key] === undefined) {
            delete req.body.sanitizedPrecio[key];
        }
    });
    next();
}
//# sourceMappingURL=precio-sanitize.dto.js.map