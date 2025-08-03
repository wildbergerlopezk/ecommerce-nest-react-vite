"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubcategoryDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateSubcategoryDto {
    name;
    description;
    categoryId;
    categorySlug;
}
exports.UpdateSubcategoryDto = UpdateSubcategoryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    (0, class_validator_1.MaxLength)(50, { message: 'El nombre debe tener máximo 50 caracteres' }),
    __metadata("design:type", String)
], UpdateSubcategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, { message: 'La descripción puede tener máximo 255 caracteres' }),
    __metadata("design:type", String)
], UpdateSubcategoryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => !o.categorySlug),
    (0, class_validator_1.IsUUID)('4', { message: 'categoryId debe ser un UUID válido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSubcategoryDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => !o.categoryId),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: 'categorySlug no puede estar vacío' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.Matches)(/\S/, { message: 'categorySlug no puede ser solo espacios en blanco' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSubcategoryDto.prototype, "categorySlug", void 0);
//# sourceMappingURL=update-subcategory.dto.js.map