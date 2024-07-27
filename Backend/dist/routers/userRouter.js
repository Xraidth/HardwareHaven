import { Router } from "express";
import userGetAllController from "../controllers/user-GetAll.Controllers.js";
import userGetOneController from "../controllers/user-GetOne.Controllers.js";
import userRegisterController from "../controllers/user-Register.Controllers.js";
import userUpdatePasswordController from "../controllers/user-UpdatePassword.Controllers.js";
import userUpdateUserNameController from "../controllers/user-UpdateUserName.Controllers.js";
import userDeleteOneController from "../controllers/user-DeleteOne.Controllers.js";
import userUpdateController from "../controllers/user-Update.Controllers.js";
//Imports de validaciones
import { sanitizeUserInput } from "../security/user-sanitize.dto.js";
const userRouter = Router();
//middlewares
userRouter.get('/getAll', userGetAllController);
userRouter.get('/getOne/:id', userGetOneController);
userRouter.post('/register', sanitizeUserInput, userRegisterController);
userRouter.patch('/updatePassword/:id', sanitizeUserInput, userUpdatePasswordController);
userRouter.patch('/updateUserName/:id', sanitizeUserInput, userUpdateUserNameController);
userRouter.delete('/deleteOne/:id', userDeleteOneController);
userRouter.put('/Update/:id', sanitizeUserInput, userUpdateController);
export default userRouter;
//# sourceMappingURL=userRouter.js.map