import {Request} from "express";
export interface CustomRequest extends Request {
    id?: number;  
    tipoUsuario?: string; 
  }
export interface Payload {
    id?: number; 
    tipoUsuario?: string; 
  }