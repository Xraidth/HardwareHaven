import { SignJWT } from "jose";
export async function jwtConstructor(user) {
    const userTosend = {
        id: user.id,
        name: user.name,
        email: user.email,
        tipoUsuario: user.tipoUsuario
    };
    const jwtConstructor = new SignJWT({ user: userTosend });
    const encoder = new TextEncoder();
    const jwt = await jwtConstructor.setProtectedHeader({
        alg: 'HS256',
        type: 'JWT'
    })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    return jwt;
}
//# sourceMappingURL=jwt.js.map