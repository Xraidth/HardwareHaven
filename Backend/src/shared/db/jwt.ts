import { SignJWT } from "jose";

export async function jwtConstructor(user: any): Promise<any> {

    const userTosend = {
        name: user.name,
        email: user.email,
        tipoUsuario: user.tipoUsuario,
        id: user.id
    }

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
