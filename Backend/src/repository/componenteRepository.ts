import { Request, Response, NextFunction } from 'express'
import { Componente } from "../model/componente.entity.js";
import { orm } from '../shared/db/orm.js'

const em = orm.em;

export class ComponenteRepository  {

    async findAll(): Promise<Componente[] | undefined> { 
        try {
            const comps = await em.find(
                Componente,
                {}
                ,{ populate: ['precios', 'categoria'] }
            
            );
            return comps;
        } catch (error: any) {
            return undefined;
        }
    }
    

    async findOne(item: { id: number }): Promise<Componente | undefined> {
        try {
            
            const comp = await em.findOneOrFail(
                Componente,
                { id: item.id },
                { populate: ['precios', 'categoria'] }
            );
            return comp;
        } catch (error: any) {
            return undefined;
        }
    }

    

    async add(item: Componente): Promise<Componente | undefined> {
        try {
            const new_comp = em.create(Componente, item)
            await em.flush()
            return new_comp;
          } catch (error: any) {
           return undefined;
          }
    }

    async update(item: Componente): Promise<Componente | undefined>{
        try {            
            const id = item.id;
            const compToUpdate = await em.findOneOrFail(Componente, { id })
            em.assign(compToUpdate, item)
            await em.flush()
            return compToUpdate;
            
          } catch (error: any) {
            return undefined;
          }
    }

    async delete(item: { id: number; }): Promise<Componente | undefined> {
        try {
            const id = item.id;
            const  comp = em.getReference(Componente, id)
            await em.removeAndFlush(comp);
            return comp;
          } catch (error: any) {
            return undefined;
          }


    }
    
    async findName(item: { name: string }): Promise<Componente | undefined> {
        try {
            const comp = await em.findOneOrFail(
                Componente,
                { name: item.name }
            );
            return comp;
        } catch (error: any) {
            return undefined;
        }
    }

    async updateDescription(item: Componente, newDescription:string): Promise<Componente | undefined> {
        try {
            const id = item.id;
            const compToUpdate = await em.findOneOrFail(Componente, { id });
            compToUpdate.description = newDescription;
            await em.persistAndFlush(compToUpdate);
            return compToUpdate;
        } catch (error: any) {
            return undefined;
        }
        }

    async updateCompName(item: Componente, newCompName:string): Promise<Componente | undefined>{
        try {
            const id = item.id;
            const compToUpdate = await em.findOneOrFail(Componente, { id });
            compToUpdate.name = newCompName;
            await em.persistAndFlush(compToUpdate);
            return compToUpdate;
        } catch (error: any) {
            return undefined;
        }


}
}