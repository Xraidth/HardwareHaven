import {
  Cascade,
    Collection,
    Entity,
    ManyToOne,
    OneToMany,
    Property,
    Rel,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Categoria } from './categoria.entity.js';
import { Precio } from './precio.entity.js';
  
@Entity()
export class Componente extends BaseEntity {

    @Property({nullable:false})
    name!: string;

    @Property({nullable:false})
    description!: string;

    @ManyToOne(() => Categoria,{nullable:false})
    categoria!: Rel<Categoria>;

    @OneToMany(() => Precio, (precio) => precio.componente, { cascade: [Cascade.ALL], nullable: true })
    precios = new Collection<Precio>(this);

    constructor(name:string,description:string, categoria:Rel<Categoria>) {
      super(); 
      this.name = name;
      this.description=description;
      this.categoria = categoria;
      
  }
  
}