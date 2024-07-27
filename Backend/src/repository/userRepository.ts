
import { User } from "../Model/user.entity.js";
import { orm } from '../shared/db/orm.js'

const em = orm.em;

export class UserRepository  {

    async findAll(): Promise<User[] | undefined> { 
        try {
            const users = await em.find(
                User,
                {}
                ,{ populate: ['compras'] }
            );
            return users;
        } catch (error: any) {
            return undefined;
        }
    }
    

    async findOne(item: { id: number }): Promise<User | undefined> {
        try {
            
            const user = await em.findOneOrFail(
                User,
                { id: item.id }
                ,{ populate: ['compras'] }
            );
            return user;
        } catch (error: any) {
            return undefined;
        }
    }

    

    async add(item: User): Promise<User | undefined> {
        try {
            const new_user = em.create(User, item)
            await em.flush()
            return new_user;
          } catch (error: any) {
           return undefined;
          }
    }

    async update(item: User): Promise<User | undefined>{
        try {            
            const id = item.id;
            const userToUpdate = await em.findOneOrFail(User, { id })
            em.assign(userToUpdate, item)
            await em.flush()
            return userToUpdate;
            
          } catch (error: any) {
            return undefined;
          }
    }

    async delete(item: { id: number; }): Promise<User | undefined> {
        try {
            const id = item.id;
            const  user = em.getReference(User, id)
            await em.removeAndFlush(user);
            return user;
          } catch (error: any) {
            return undefined;
          }


    }
    
    async findName(item: { name: string }): Promise<User | undefined> {
        try {
            
            const user = await em.findOneOrFail(
                User,
                { name: item.name }
                ,{ populate: ['compras'] }
            );
            return user;
        } catch (error: any) {
            return undefined;
        }
    }

    async updatePassword(item: User, newPassword:string): Promise<User | undefined> {
        try {
            const id = item.id;
            const userToUpdate = await em.findOneOrFail(User, { id });
            userToUpdate.password = newPassword;
            await em.persistAndFlush(userToUpdate);
            return userToUpdate;
        } catch (error: any) {
            return undefined;
        }
        }

    async updateUserName(item: User, newUserName:string): Promise<User | undefined>{
        try {
            const id = item.id;
            const userToUpdate = await em.findOneOrFail(User, { id });
            userToUpdate.name = newUserName;
            await em.persistAndFlush(userToUpdate);
            return userToUpdate;
        } catch (error: any) {
            return undefined;
        }


}
}
