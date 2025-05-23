var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Cascade, Collection, Entity, ManyToOne, OneToMany, Property, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Categoria } from './categoria.entity.js';
import { Precio } from './precio.entity.js';
let Componente = class Componente extends BaseEntity {
    constructor(name, description, categoria, imgURL) {
        super();
        this.precios = new Collection(this);
        this.name = name;
        this.description = description;
        this.categoria = categoria;
        this.imgURL = imgURL;
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Componente.prototype, "name", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Componente.prototype, "description", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Componente.prototype, "imgURL", void 0);
__decorate([
    ManyToOne(() => Categoria, { nullable: false }),
    __metadata("design:type", Object)
], Componente.prototype, "categoria", void 0);
__decorate([
    OneToMany(() => Precio, (precio) => precio.componente, { cascade: [Cascade.ALL], nullable: true }),
    __metadata("design:type", Object)
], Componente.prototype, "precios", void 0);
Componente = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String, String, Object, String])
], Componente);
export { Componente };
//# sourceMappingURL=componente.entity.js.map