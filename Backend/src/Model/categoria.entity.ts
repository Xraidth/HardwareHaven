import {
    Entity,
    Property,
    ManyToOne,
    OneToMany,
    Collection,
    Cascade
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/db/baseEntity.entity.js'

import {Componente}  from './componente.entity.js'

@Entity()
export class Categoria extends BaseEntity {
    
    @Property({nullable:false})
    descripcion!: string;

    
    @OneToMany(() => Componente, (componente) => componente.categoria, { cascade: [Cascade.ALL], nullable: true })
    componentes = new Collection<Componente>(this);


    constructor(descripcion:string) {
      super(); 
      this.descripcion = descripcion;
      
  }

}
