export function sanitizeUserInput(req, res, next) {
    if (!req.body || typeof req.body !== 'object') {
        return next();
    }
    req.body.sanitizedUser = {
        name: req.body.nameUser,
        password: req.body.password,
        email: req.body.email,
        tipoUsuario: req.body.tipoUsuario,
        fechaNac: req.body.fechaNac,
        sexo: req.body.sexo,
        direccion: req.body.direccion,
        newPassword: req.body.newPassword,
        oldPassword: req.body.oldPassword,
        newUserName: req.body.newUserName,
        newUserType: req.body.newUserType,
        newBirthDate: req.body.newBirthDate,
        newSex: req.body.newSex,
        newAddress: req.body.newAddress
    };
    Object.keys(req.body.sanitizedUser).forEach((key) => {
        if (req.body.sanitizedUser[key] === undefined) {
            delete req.body.sanitizedUser[key];
        }
    });
    next();
}
//# sourceMappingURL=user-sanitize.dto.js.map