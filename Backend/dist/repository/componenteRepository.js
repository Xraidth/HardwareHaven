import { Componente } from "../model/componente.entity.js";
import { orm } from '../shared/db/orm.js';
const em = orm.em;
export class ComponenteRepository {
    async findAll() {
        try {
            const comps = await em.find(Componente, {}, { populate: ['precios', 'categoria'] });
            return comps;
        }
        catch (error) {
            return undefined;
        }
    }
    async findOne(item) {
        try {
            const comp = await em.findOneOrFail(Componente, { id: item.id }, { populate: ['precios', 'categoria'] });
            return comp;
        }
        catch (error) {
            return undefined;
        }
    }
    async add(item) {
        try {
            const new_comp = em.create(Componente, item);
            await em.flush();
            return new_comp;
        }
        catch (error) {
            return undefined;
        }
    }
    async update(item) {
        try {
            const id = item.id;
            const compToUpdate = await em.findOneOrFail(Componente, { id });
            em.assign(compToUpdate, item);
            await em.flush();
            return compToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
    async delete(item) {
        try {
            const id = item.id;
            const comp = em.getReference(Componente, id);
            await em.removeAndFlush(comp);
            return comp;
        }
        catch (error) {
            return undefined;
        }
    }
    async findName(item) {
        try {
            const comp = await em.findOneOrFail(Componente, { name: item.name });
            return comp;
        }
        catch (error) {
            return undefined;
        }
    }
    async updateDescription(item, newDescription) {
        try {
            const id = item.id;
            const compToUpdate = await em.findOneOrFail(Componente, { id });
            compToUpdate.description = newDescription;
            await em.persistAndFlush(compToUpdate);
            return compToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
    async updateCompName(item, newCompName) {
        try {
            const id = item.id;
            const compToUpdate = await em.findOneOrFail(Componente, { id });
            compToUpdate.name = newCompName;
            await em.persistAndFlush(compToUpdate);
            return compToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
}
//# sourceMappingURL=componenteRepository.js.map