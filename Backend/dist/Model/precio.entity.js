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
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
export let Precio = class Precio extends BaseEntity {
    constructor(fechaDesde, valor, componente) {
        super();
        this.fechaDesde = fechaDesde;
        this.valor = valor;
        this.componente = componente;
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], Precio.prototype, "fechaDesde", void 0);
__decorate([
    Property({ type: 'decimal', precision: 9, scale: 3 }),
    __metadata("design:type", Number)
], Precio.prototype, "valor", void 0);
__decorate([
    ManyToOne(() => Componente, { nullable: false }),
    __metadata("design:type", Object)
], Precio.prototype, "componente", void 0);
Precio = __decorate([
    Entity(),
    __metadata("design:paramtypes", [Date, Number, Object])
], Precio);
//# sourceMappingURL=precio.entity.js.map