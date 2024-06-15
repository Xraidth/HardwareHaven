import { Categoria } from '../model/categoria.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
export class CategoriaRepository {
    async findAll() {
        try {
            const categorias = await em.find(Categoria, {}, { populate: ['componentes'] });
            return categorias;
        }
        catch (error) {
            return undefined;
        }
    }
    async findOne(item) {
        try {
            return await em.findOneOrFail(Categoria, { id: item.id }, { populate: ['componentes'] });
        }
        catch (error) {
            return undefined;
        }
    }
    async add(item) {
        try {
            const new_categoria = em.create(Categoria, item);
            await em.flush();
            return new_categoria;
        }
        catch (error) {
            return undefined;
        }
    }
    async update(item) {
        try {
            if (!item.id) {
                console.error('ERROR');
                return undefined;
            }
            const categoriaToUpdate = await this.findOne({ id: item.id });
            if (categoriaToUpdate) {
                em.assign(categoriaToUpdate, item);
                await em.flush();
                return categoriaToUpdate;
            }
            else {
                console.error('Categoria not found');
                return undefined;
            }
        }
        catch (error) {
            return undefined;
        }
    }
    async delete(item) {
        try {
            const id = item.id;
            const categoria = await this.findOne({ id });
            if (categoria) {
                await em.removeAndFlush(categoria);
                return categoria;
            }
            else {
                console.error('Categoria not found');
                return undefined;
            }
        }
        catch (error) {
            return undefined;
        }
    }
    async updateDescripcion(item, newDescripcion) {
        try {
            if (!item.id) {
                console.error('ERROR');
                return undefined;
            }
            const categoriaToUpdate = await this.findOne({ id: item.id });
            if (categoriaToUpdate) {
                categoriaToUpdate.descripcion = newDescripcion;
                await em.persistAndFlush(categoriaToUpdate);
                return categoriaToUpdate;
            }
            else {
                console.error('Categoria not found');
                return undefined;
            }
        }
        catch (error) {
            return undefined;
        }
    }
    async findByDescription(item) {
        try {
            const categoria = await em.findOneOrFail(Categoria, { descripcion: item.descripcion }, { populate: ['componentes'] });
            return categoria;
        }
        catch (error) {
            return undefined;
        }
    }
}
//# sourceMappingURL=catergoriaRespository.js.map