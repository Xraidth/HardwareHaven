var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, OneToMany, Collection, Cascade } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Componente } from './componente.entity.js';
export let Categoria = class Categoria extends BaseEntity {
    constructor(descripcion) {
        super();
        this.componentes = new Collection(this);
        this.descripcion = descripcion;
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Categoria.prototype, "descripcion", void 0);
__decorate([
    OneToMany(() => Componente, (componente) => componente.categoria, { cascade: [Cascade.ALL], nullable: true }),
    __metadata("design:type", Object)
], Categoria.prototype, "componentes", void 0);
Categoria = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String])
], Categoria);
//# sourceMappingURL=categoria.entity.js.map