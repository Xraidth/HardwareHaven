import { Compra } from '../model/compra.entity.js';
import { LineaCompra } from '../model/lineaCompra.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

export class CompraRepository  {

    async findAll(): Promise<Compra[] | undefined> { 
        try {
            const compras = await em.find(
                Compra,
                {}
                ,{ populate: ['user', 'lineasCompras'] }
            );
            return compras;
        } catch (error: any) {
            return undefined;
        }
    }
    

    async findOne(item: { id: number }): Promise<Compra | undefined> {
        try {
            
            const compra = await em.findOneOrFail(
                Compra,
                { id: item.id }
                ,{ populate: ['user', 'lineasCompras'] }
            );
            return compra;
        } catch (error: any) {
            return undefined;
        }
    }

    

    async add(item: Compra): Promise<Compra | undefined> {
        try {
            const new_compra = em.create(Compra, item)
            await em.flush()
            return new_compra;
          } catch (error: any) {
           return undefined;
          }
    }

    async update(item: Compra): Promise<Compra | undefined>{
        try {            
            const id = item.id;
            const compraToUpdate = await em.findOneOrFail(Compra, { id })
            em.assign(compraToUpdate, item)
            await em.flush()
            return compraToUpdate;
            
          } catch (error: any) {
            return undefined;
          }
    }

    async delete(item: { id: number; }): Promise<Compra | undefined> {
        try {
            const id = item.id;
            const  compra = em.getReference(Compra, id)
            await em.removeAndFlush(compra);
            return compra;
          } catch (error: any) {
            return undefined;
          }


    }
    
    async findByFechaCompra(item: { fechaCompra: Date }): Promise<Compra[] | undefined> {
        try {
            
            const compras = await em.find(
                Compra,
                { fechaCompra: item.fechaCompra }
                ,{ populate: ['user', 'lineasCompras'] }
            );
            return compras;
        } catch (error: any) {
            return undefined;
        }
    }

    async findByFechaCancel(item: { fechaCancel: Date }): Promise<Compra[] | undefined> {
        try {
            
            const compras = await em.find(
                Compra,
                { fechaCancel: item.fechaCancel }
                ,{ populate: ['user', 'lineasCompras'] }
            );
            return compras;
        } catch (error: any) {
            return undefined;
        }
    }

    async updateFechaCompra(item: Compra, newFechaCompra:Date): Promise<Compra | undefined> {
        try {
            const id = item.id;
            const compraToUpdate = await em.findOneOrFail(Compra, { id });
            compraToUpdate.fechaCompra = newFechaCompra;
            await em.persistAndFlush(compraToUpdate);
            return compraToUpdate;
        } catch (error: any) {
            return undefined;
        }
        }

    async updateFechaCancel(item: Compra, newFechaCancel: Date): Promise<Compra | undefined>{
        try {
            const id = item.id;
            const compraToUpdate = await em.findOneOrFail(Compra, { id });
            compraToUpdate.fechaCancel = newFechaCancel;
            await em.persistAndFlush(compraToUpdate);
            return compraToUpdate;
        } catch (error: any) {
            return undefined;
        }
    }
    async updateTotal(item: Compra, newTotal: number ): Promise<Compra | undefined>{
        try {
            const id = item.id;
            const compraToUpdate = await em.findOneOrFail(Compra, { id });
           compraToUpdate.total = newTotal;
           await em.persistAndFlush(compraToUpdate);
           return compraToUpdate;
        } catch (error: any) {
                return undefined;
        }
    }
    async calculateTotal(item: Compra): Promise<Compra | undefined>{
        try {
            const id = item.id;
            const compraToUpdate = await em.findOneOrFail(Compra, { id });
            compraToUpdate.total = compraToUpdate.lineasCompras.reduce((accumulator:number, currentValue:LineaCompra) => accumulator + currentValue.subTotal, 0);
           await em.persistAndFlush(compraToUpdate);
           return compraToUpdate;
        } catch (error: any) {
                return undefined;
        }
    }
}
