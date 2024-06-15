var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, } from '@mikro-orm/core';
import { Componente } from './componente.entity.js';
import { Compra } from './compra.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
export let LineaCompra = class LineaCompra extends BaseEntity {
    constructor(cantidad, compra, componente) {
        super();
        this.cantidad = cantidad;
        this.compra = compra;
        this.componente = componente;
    }
    setSubTotal(subTotal) {
        this.subTotal = subTotal;
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Number)
], LineaCompra.prototype, "cantidad", void 0);
__decorate([
    Property({ type: 'decimal', precision: 9, scale: 3, nullable: true }),
    __metadata("design:type", Number)
], LineaCompra.prototype, "subTotal", void 0);
__decorate([
    ManyToOne(() => Compra, { nullable: false }),
    __metadata("design:type", Object)
], LineaCompra.prototype, "compra", void 0);
__decorate([
    ManyToOne(() => Componente, { nullable: false }),
    __metadata("design:type", Componente)
], LineaCompra.prototype, "componente", void 0);
LineaCompra = __decorate([
    Entity(),
    __metadata("design:paramtypes", [Number, Object, Componente])
], LineaCompra);
//# sourceMappingURL=lineaCompra.entity.js.map