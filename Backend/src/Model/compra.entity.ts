import {
    Entity,
    OneToMany,
    Property,
    Cascade,
    Collection,
    ManyToOne,
    Rel
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { User } from './user.entity.js';
import {LineaCompra}  from './lineaCompra.entity.js'

@Entity()
export class Compra extends BaseEntity {

    @Property({nullable:false})
    fechaCompra!: Date;

    @Property({nullable:true})
    fechaCancel!: Date;
    
    @Property({ type: 'decimal', precision: 9, scale: 3, nullable:true })
    total!: number;

    @ManyToOne(() => User,{nullable:false})
    user!: Rel<User>;

    @OneToMany(() => LineaCompra, (lineaCompra) => lineaCompra.compra, { cascade: [Cascade.ALL], nullable: true })
    lineasCompras = new Collection<LineaCompra>(this);

    constructor(user:Rel<User>) {
      super(); 
      this.fechaCompra = new Date();
      this.user = user;
      
  }

}
