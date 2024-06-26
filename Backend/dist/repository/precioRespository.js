import { Precio } from '../Model/precio.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
export class PrecioRepository {
    async findAll() {
        try {
            const precios = await em.find(Precio, {}, { populate: ['componente'] });
            return precios;
        }
        catch (error) {
            return undefined;
        }
    }
    async findOne(item) {
        try {
            const precio = await em.findOneOrFail(Precio, { id: item.id
            }, { populate: ['componente'] });
            return precio;
        }
        catch (error) {
            return undefined;
        }
    }
    async add(item) {
        try {
            const new_precio = em.create(Precio, item);
            await em.flush();
            return new_precio;
        }
        catch (error) {
            return undefined;
        }
    }
    async update(item) {
        try {
            if (!item.componente.id) {
                return undefined;
            }
            if (!item.id) {
                return undefined;
            }
            const precioToUpdate = await this.findOne({ id: item.id });
            if (precioToUpdate) {
                em.assign(precioToUpdate, item);
                await em.flush();
                return precioToUpdate;
            }
            else {
                console.error('Precio not found');
                return undefined;
            }
        }
        catch (error) {
            return undefined;
        }
    }
    async delete(item) {
        try {
            if (!item.id) {
                return undefined;
            }
            const precio = await this.findOne({ id: item.id });
            if (precio) {
                await em.removeAndFlush(precio);
                return precio;
            }
            else {
                console.error('Precio not found');
                return undefined;
            }
        }
        catch (error) {
            return undefined;
        }
    }
    async updateValor(item, newValor) {
        try {
            if (!item.fechaDesde || !item.componente.id || !item.id) {
                console.error('ERROR');
                return undefined;
            }
            const precioToUpdate = await this.findOne({ id: item.id });
            if (precioToUpdate) {
                precioToUpdate.valor = newValor;
                await em.persistAndFlush(precioToUpdate);
                return precioToUpdate;
            }
            else {
                console.error('Precio not found');
                return undefined;
            }
        }
        catch (error) {
            return undefined;
        }
    }
}
//# sourceMappingURL=precioRespository.js.map