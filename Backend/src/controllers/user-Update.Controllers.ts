import { Request, Response } from "express";
import { UserRepository } from "../repository/userRepository.js";

const userRepo = new UserRepository();

const userUpdateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { newPassword, oldPassword, newUserName, newUserType } = req.body;
  const id = parseInt(req.params.id);

  try {
    const user = await userRepo.findOne({ id: id });

    if (user) {
      // Verifica que la contraseña anterior sea correcta
      if (user.password === oldPassword) {
        // Si el nombre de usuario ha cambiado
        if (user.name !== newUserName) {
          // Verifica si ya existe otro usuario con el nuevo nombre de usuario
          const existingUser = await userRepo.findName({ name: newUserName });
          if (existingUser) {
            res.status(400).json({
              data: undefined,
              message: "User name already exists",
            });
            return;
          }

          // Si no existe, actualiza el nombre de usuario
          user.name = newUserName;
        }

        // Si se proporciona una nueva contraseña, actualízala
        if (newPassword && newPassword.trim() !== "") {
          user.password = newPassword;
        }

        // Si se proporciona una nuevo tipo, actualízala
        if (newUserType && newUserType.trim() !== "") {
          user.tipoUsuario = newUserType;
        }

        const user_updated = await userRepo.update(user);
        res.status(200).json({
          data: user_updated,
          message: "The user was updated",
        });
      } else {
        res.status(404).json({
          data: undefined,
          message: "Incorrect credentials",
        });
      }
    } else {
      res.status(404).json({
        data: undefined,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: undefined,
      message: "There was a server error",
    });
  }
};

export default userUpdateController;
