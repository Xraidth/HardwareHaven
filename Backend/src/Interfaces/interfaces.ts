import {Request} from "express";
import { User } from "../model/user.entity";
export interface CustomRequest extends Request {
    id?: number;  
    tipoUsuario?: string; 
  }
export interface Payload {
    user:User
  }