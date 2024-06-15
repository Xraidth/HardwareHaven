import { User } from "../model/user.entity.js";
import { orm } from '../shared/db/orm.js';
const em = orm.em;
export class UserRepository {
    async findAll() {
        try {
            const users = await em.find(User, {}, { populate: ['compras'] });
            return users;
        }
        catch (error) {
            return undefined;
        }
    }
    async findOne(item) {
        try {
            const user = await em.findOneOrFail(User, { id: item.id }, { populate: ['compras'] });
            return user;
        }
        catch (error) {
            return undefined;
        }
    }
    async add(item) {
        try {
            const new_user = em.create(User, item);
            await em.flush();
            return new_user;
        }
        catch (error) {
            return undefined;
        }
    }
    async update(item) {
        try {
            const id = item.id;
            const userToUpdate = await em.findOneOrFail(User, { id });
            em.assign(userToUpdate, item);
            await em.flush();
            return userToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
    async delete(item) {
        try {
            const id = item.id;
            const user = em.getReference(User, id);
            await em.removeAndFlush(user);
            return user;
        }
        catch (error) {
            return undefined;
        }
    }
    async findName(item) {
        try {
            const user = await em.findOneOrFail(User, { name: item.name }, { populate: ['compras'] });
            return user;
        }
        catch (error) {
            return undefined;
        }
    }
    async updatePassword(item, newPassword) {
        try {
            const id = item.id;
            const userToUpdate = await em.findOneOrFail(User, { id });
            userToUpdate.password = newPassword;
            await em.persistAndFlush(userToUpdate);
            return userToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
    async updateUserName(item, newUserName) {
        try {
            const id = item.id;
            const userToUpdate = await em.findOneOrFail(User, { id });
            userToUpdate.name = newUserName;
            await em.persistAndFlush(userToUpdate);
            return userToUpdate;
        }
        catch (error) {
            return undefined;
        }
    }
}
//# sourceMappingURL=userRepository.js.map