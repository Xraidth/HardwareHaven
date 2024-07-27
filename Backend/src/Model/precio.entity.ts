import {
    Entity,
    OneToMany,
    Property,
    Cascade,
    Collection,
    ManyToOne,
    PrimaryKey,
    Rel,
  } from '@mikro-orm/core'
  

import {Componente}  from './componente.entity.js'
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

@Entity()
export class Precio extends BaseEntity {

    @Property({nullable:false})
    fechaDesde!: Date;
    
    @Property({ type: 'decimal', precision: 9, scale: 3 })
    valor!: number;

    @ManyToOne(() => Componente,{nullable:false})
    componente!: Rel<Componente>;    

    constructor(fechaDesde:Date, valor:number,componente:Rel<Componente>) {
      super();
      this.fechaDesde = fechaDesde;
      this.valor = valor;
      this.componente = componente;
  }

}
