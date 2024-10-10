import { Router } from "express";


import userGetAllController from "../controllers/user-GetAll.Controllers.js";
import userGetOneController from "../controllers/user-GetOne.Controllers.js";
import userRegisterController from "../controllers/user-Register.Controllers.js";
import userUpdatePasswordController from "../controllers/user-UpdatePassword.Controllers.js";
import userUpdateUserNameController from "../controllers/user-UpdateUserName.Controllers.js";
import userDeleteOneController from "../controllers/user-DeleteOne.Controllers.js";
import userUpdateController from "../controllers/user-Update.Controllers.js";
//Imports de validaciones
import {sanitizeUserInput} from "../security/user-sanitize.dto.js"
import userLoginController from "../controllers/user-Login.Controllers.js";
import userJWTDTOAdmin from "../dto/userJWTDTOAdmin.js";
import userJWTDTO from "../dto/userJWTDTO.js";
import userDTO from "../dto/userDTO.js";
const userRouter = Router();



//middlewares
userRouter.get('/getAll',userJWTDTOAdmin, userGetAllController)
userRouter.get('/getOne/:id',userJWTDTOAdmin, userGetOneController)
userRouter.post('/register',sanitizeUserInput, userDTO, userRegisterController);
userRouter.post('/login', sanitizeUserInput,userDTO, userLoginController)
userRouter.patch('/updatePassword/:id',userJWTDTO, sanitizeUserInput,userDTO, userUpdatePasswordController);
userRouter.patch('/updateUserName/:id',userJWTDTO , sanitizeUserInput,userDTO, userUpdateUserNameController);
userRouter.delete('/deleteOne/:id',userJWTDTO, userDeleteOneController);
userRouter.put('/update/:id',userJWTDTO, sanitizeUserInput,userDTO, userUpdateController)



export default userRouter;
