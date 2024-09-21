import { Request, Response } from 'express';
import { UserRepository } from "../repository/userRepository.js";
//import { compare } from "bcrypt"; //Para encriptar la clave en la base de datos
import { SignJWT } from 'jose';

const userRepo = new UserRepository();

const userLoginController = async (req: Request, res: Response) => {       
    const { name, password } = req.body;
    
    try {
        const user = await userRepo.findName(name);
        
        if (user) {
            const checkPassword = (password == user.password)//await compare(password, user.password);
            if (!checkPassword) {
                return res.status(401).send('Credenciales incorrectas');
            }

            const jwtConstructor = new SignJWT({ id: user.id, tipoUsuario: user.tipoUsuario  });
            const encoder = new TextEncoder();
            const jwt = await jwtConstructor.setProtectedHeader({
                alg: 'HS256',
                type: 'JWT'
            })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

            return res.status(200).json({
                jwt,
                data: user,
                message: "User logged in successfully"
            });
        } else {
            return res.status(401).json({
                data: undefined,
                message: 'Credenciales incorrectas'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            data: undefined,
            message: 'There was a server error'
        });
    }     
};

export default userLoginController;
