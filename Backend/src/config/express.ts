import express  from "express";
import userRouter from "../routers/userRouter.js";
import 'reflect-metadata';
import { orm, syncSchema } from '../shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import categoriaRouter from "../routers/categoriaRouter.js";
import precioRouter from "../routers/precioRouter.js";
import lineaCompraRouter from "../routers/lineCompraRouter.js";
import compraRouter from "../routers/compraRouter.js";
import compRouter from "../routers/componenteRouter.js";

//import cors from 'cors';

const HarwareHavenexpressApp = express();

//All the middlewares, routers BASE

HarwareHavenexpressApp.use(express.json());
//HarwareHavenexpressApp.use(cors());

//Base conection 
HarwareHavenexpressApp.use((req, res, next) => {
    RequestContext.create(orm.em, next)
  })

//Routers del Negocio-------------------------------
HarwareHavenexpressApp.use('/api/user', userRouter);
HarwareHavenexpressApp.use('/api/compra', compraRouter);
HarwareHavenexpressApp.use('/api/lineaCompra', lineaCompraRouter);
HarwareHavenexpressApp.use('/api/precio', precioRouter);
HarwareHavenexpressApp.use('/api/categoria', categoriaRouter);
HarwareHavenexpressApp.use('/api/componente', compRouter);




HarwareHavenexpressApp.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' })
  })


await syncSchema() //never in production



export {
HarwareHavenexpressApp
};