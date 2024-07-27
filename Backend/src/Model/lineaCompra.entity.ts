import {
    Entity,
    Property,
    ManyToOne, 
    PrimaryKey,
    Rel,
  } from '@mikro-orm/core'
  

import{Componente} from './componente.entity.js'
import { Compra } from './compra.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';



  
@Entity()
export class LineaCompra extends BaseEntity{

    @Property({nullable:false})
    cantidad!: number;
    
    @Property({ type: 'decimal', precision: 9, scale: 3, nullable: true })
    subTotal!: number;

    @ManyToOne(() => Compra,{nullable:false})
    compra!: Rel<Compra>;

    @ManyToOne(() => Componente ,{nullable:false})
    componente!: Componente;

    constructor(cantidad:number, compra:Rel<Compra>, componente:Componente)
     {
      super();
      this.cantidad = cantidad;
      this.compra = compra;
      this.componente = componente;
  }
  setSubTotal(subTotal:number)
  {
    this.subTotal = subTotal
  }

}
