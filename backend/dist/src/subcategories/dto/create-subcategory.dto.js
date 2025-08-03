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
exports.CreateSubcategoryDto = void 0;
const class_validator_1 = require("class-validator");
class CreateSubcategoryDto {
    categoryId;
    categorySlug;
    name;
    description;
}
exports.CreateSubcategoryDto = CreateSubcategoryDto;
__decorate([
    (0, class_validator_1.ValidateIf)(o => !o.categorySlug),
    (0, class_validator_1.IsUUID)('4', { message: 'categoryId debe ser un UUID válido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubcategoryDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => !o.categoryId),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1, { message: 'categorySlug no puede estar vacío' }),
    (0, class_validator_1.MaxLength)(100),
    (0, class_validator_1.Matches)(/\S/, { message: 'categorySlug no puede ser solo espacios en blanco' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubcategoryDto.prototype, "categorySlug", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateSubcategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateSubcategoryDto.prototype, "description", void 0);
//# sourceMappingURL=create-subcategory.dto.js.map