import { jwtVerify } from "jose";
const userJWTDTO = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send('Usuario no autorizado "No hay autorization" ');
    const jwt = authorization.split(' ')[1];
    if (!jwt)
        return res.status(401).send('Usuario no autorizado "No hay jwt"');
    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(jwt, encoder.encode(process.env.JWT_PRIVATE_KEY));
        if (!payload.user.tipoUsuario)
            return res.status(500).send('Erro interno "Erro al momento de crear o leer el tipo de usuario"');
        if (!['Administrador', 'Cliente'].includes(payload.user.tipoUsuario)) {
            return res.status(403).send('Acceso denegado por tipo de usuario');
        }
        req.id = Number(payload.user.id);
        req.tipoUsuario = payload.user.tipoUsuario;
        next();
    }
    catch (error) {
        if (error.code === 'ERR_JWT_EXPIRED') {
            return res.status(401).send('Token expirado');
        }
        else if (error.code === 'ERR_JWT_INVALID') {
            return res.status(401).send('Token inválido');
        }
        console.error('JWT verification error:', error);
        return res.status(401).send('Usuario no autorizado "JWT"');
    }
};
export default userJWTDTO;
//# sourceMappingURL=userJWTDTO.js.map