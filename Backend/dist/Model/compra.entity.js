var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, OneToMany, Property, Cascade, Collection, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { User } from './user.entity.js';
import { LineaCompra } from './lineaCompra.entity.js';
export let Compra = class Compra extends BaseEntity {
    constructor(user) {
        super();
        this.lineasCompras = new Collection(this);
        this.fechaCompra = new Date();
        this.user = user;
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], Compra.prototype, "fechaCompra", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", Date)
], Compra.prototype, "fechaCancel", void 0);
__decorate([
    Property({ type: 'decimal', precision: 9, scale: 3, nullable: true }),
    __metadata("design:type", Number)
], Compra.prototype, "total", void 0);
__decorate([
    ManyToOne(() => User, { nullable: false }),
    __metadata("design:type", Object)
], Compra.prototype, "user", void 0);
__decorate([
    OneToMany(() => LineaCompra, (lineaCompra) => lineaCompra.compra, { cascade: [Cascade.ALL], nullable: true }),
    __metadata("design:type", Object)
], Compra.prototype, "lineasCompras", void 0);
Compra = __decorate([
    Entity(),
    __metadata("design:paramtypes", [Object])
], Compra);
//# sourceMappingURL=compra.entity.js.map