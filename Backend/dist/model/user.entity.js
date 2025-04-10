var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, OneToMany, Property, Cascade, Collection, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Compra } from './compra.entity.js';
let User = class User extends BaseEntity {
    constructor(name, password, email, tipoUsuario, fechaReg, fechaNac, sexo, direccion) {
        super();
        this.compras = new Collection(this);
        this.name = name;
        this.password = password;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
        this.fechaReg = fechaReg;
        this.fechaNac = fechaNac;
        this.sexo = sexo;
        this.direccion = direccion;
    }
};
__decorate([
    Property({ nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "tipoUsuario", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "fechaReg", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "sexo", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "fechaNac", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "direccion", void 0);
__decorate([
    OneToMany(() => Compra, c => c.user, { cascade: [Cascade.ALL] }),
    __metadata("design:type", Object)
], User.prototype, "compras", void 0);
User = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String, String, String, String, Date, Date, String, String])
], User);
export { User };
//# sourceMappingURL=user.entity.js.map