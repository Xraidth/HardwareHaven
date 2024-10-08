import {
    Entity,
    OneToMany,
    Property,
    Cascade,
    Collection,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
  import { Compra } from './compra.entity.js';
@Entity()
export class User extends BaseEntity {

    @Property({nullable:false, unique: true})
    name!: string;

    @Property({nullable:false})
    password!: string;

    @Property({nullable:false})
    email!: string;

    @Property({nullable:false})
    tipoUsuario!: string;

    @OneToMany(() => Compra, c => c.user, { cascade: [Cascade.ALL] })
    compras = new Collection<Compra>(this);

    constructor(name:string, password: string, email: string, tipoUsuario:string) {
      super(); 
      this.name = name;
      this.password = password;
      this.email = email;
      this.tipoUsuario = tipoUsuario;
  }
}

