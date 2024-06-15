import { LineaCompra } from '../model/lineaCompra.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
export class LineaCompraRepository {
    async findAll() {
        try {
            const lineaCompras = await em.find(LineaCompra, {}, { populate: ['compra',
                    'componente'
                ] });
            return lineaCompras;
        }
        catch (error) {
            return undefined;
        }
    }
    async findOne(item) {
        try {
            const liena_compra = await em.findOneOrFail(LineaCompra, { id: item.id }, { populate: ['compra', 'componente'] });
            return liena_compra;
        }
        catch (error) {
            return undefined;
        }
    }
    async add(item) {
        try {
            const new_lineaCompra = em.create(LineaCompra, item);
            await em.flush();
            return new_lineaCompra;
        }
        catch (error) {
            return undefined;
        }
    }
    async update(item) {
        try {
            const lineaCompraToUpdate = await em.findOneOrFail(LineaCompra, { id: item.id });
            em.assign(lineaCompraToUpdate, item);
            await em.flush();
            return lineaCompraToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
    async delete(item) {
        try {
            const linea_compra = await this.findOne(item);
            if (linea_compra) {
                await em.removeAndFlush(linea_compra);
                return linea_compra;
            }
            else {
                console.error('LineaCompra not found');
                return undefined;
            }
        }
        catch (error) {
            return undefined;
        }
    }
    async updateCantidad(item, newCantidad) {
        try {
            if (!item.compra || !item.compra.id || !item.id) {
                console.error('ERROR');
                return undefined;
            }
            const lineaCompraToUpdate = await this.findOne({ id: item.id });
            if (lineaCompraToUpdate) {
                lineaCompraToUpdate.cantidad = newCantidad;
                await em.persistAndFlush(lineaCompraToUpdate);
                return lineaCompraToUpdate;
            }
            else {
                console.error('LineaCompra not found');
                return undefined;
            }
        }
        catch (error) {
            return undefined;
        }
    }
    async updateSubTotal(item, newSubTotal) {
        try {
            if (!item.compra || !item.compra.id || !item.id) {
                console.error('ERROR');
                return undefined;
            }
            const lineaCompraToUpdate = await this.findOne({ id: item.id });
            if (lineaCompraToUpdate) {
                lineaCompraToUpdate.subTotal = newSubTotal;
                await em.persistAndFlush(lineaCompraToUpdate);
                return lineaCompraToUpdate;
            }
            else {
                console.error('LineaCompra not found');
                return undefined;
            }
        }
        catch (error) {
            return undefined;
        }
    }
}
//# sourceMappingURL=lineaCompraRepository.js.map