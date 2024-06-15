import { Compra } from '../model/compra.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
export class CompraRepository {
    async findAll() {
        try {
            const compras = await em.find(Compra, {}, { populate: ['user', 'lineasCompras'] });
            return compras;
        }
        catch (error) {
            return undefined;
        }
    }
    async findOne(item) {
        try {
            const compra = await em.findOneOrFail(Compra, { id: item.id }, { populate: ['user', 'lineasCompras'] });
            return compra;
        }
        catch (error) {
            return undefined;
        }
    }
    async add(item) {
        try {
            const new_compra = em.create(Compra, item);
            await em.flush();
            return new_compra;
        }
        catch (error) {
            return undefined;
        }
    }
    async update(item) {
        try {
            const id = item.id;
            const compraToUpdate = await em.findOneOrFail(Compra, { id });
            em.assign(compraToUpdate, item);
            await em.flush();
            return compraToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
    async delete(item) {
        try {
            const id = item.id;
            const compra = em.getReference(Compra, id);
            await em.removeAndFlush(compra);
            return compra;
        }
        catch (error) {
            return undefined;
        }
    }
    async findByFechaCompra(item) {
        try {
            const compras = await em.find(Compra, { fechaCompra: item.fechaCompra }, { populate: ['user', 'lineasCompras'] });
            return compras;
        }
        catch (error) {
            return undefined;
        }
    }
    async findByFechaCancel(item) {
        try {
            const compras = await em.find(Compra, { fechaCancel: item.fechaCancel }, { populate: ['user', 'lineasCompras'] });
            return compras;
        }
        catch (error) {
            return undefined;
        }
    }
    async updateFechaCompra(item, newFechaCompra) {
        try {
            const id = item.id;
            const compraToUpdate = await em.findOneOrFail(Compra, { id });
            compraToUpdate.fechaCompra = newFechaCompra;
            await em.persistAndFlush(compraToUpdate);
            return compraToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
    async updateFechaCancel(item, newFechaCancel) {
        try {
            const id = item.id;
            const compraToUpdate = await em.findOneOrFail(Compra, { id });
            compraToUpdate.fechaCancel = newFechaCancel;
            await em.persistAndFlush(compraToUpdate);
            return compraToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
    async updateTotal(item, newTotal) {
        try {
            const id = item.id;
            const compraToUpdate = await em.findOneOrFail(Compra, { id });
            compraToUpdate.total = newTotal;
            await em.persistAndFlush(compraToUpdate);
            return compraToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
    async calculateTotal(item) {
        try {
            const id = item.id;
            const compraToUpdate = await em.findOneOrFail(Compra, { id });
            compraToUpdate.total = compraToUpdate.lineasCompras.reduce((accumulator, currentValue) => accumulator + currentValue.subTotal, 0);
            await em.persistAndFlush(compraToUpdate);
            return compraToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
}
//# sourceMappingURL=compraRepository.js.map