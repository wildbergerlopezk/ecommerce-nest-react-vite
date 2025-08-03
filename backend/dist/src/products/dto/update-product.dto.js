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
exports.UpdateProductDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_product_dto_1 = require("./create-product.dto");
class UpdateProductDto {
    subcategoryId;
    imageUrl;
    subcategorySlug;
    name;
    description;
    brand;
    weight;
    height;
    width;
    depth;
    price;
    currency;
    stock;
    isActive;
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'subcategoryId debe ser un UUID válido' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "subcategoryId", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'imageUrl debe ser una URL válida' }),
    (0, class_validator_1.MaxLength)(500, { message: 'imageUrl no debe superar los 500 caracteres' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'subcategorySlug debe ser una cadena' }),
    (0, class_validator_1.MaxLength)(100, { message: 'subcategorySlug no debe superar los 100 caracteres' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "subcategorySlug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'name debe ser una cadena' }),
    (0, class_validator_1.MaxLength)(255, { message: 'name no debe superar los 100 caracteres' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'description debe ser una cadena' }),
    (0, class_validator_1.MaxLength)(500, { message: 'description no debe superar los 500 caracteres' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'brand debe ser una cadena' }),
    (0, class_validator_1.MaxLength)(50, { message: 'brand no debe superar los 50 caracteres' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'weight debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'weight no puede ser negativo' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'height debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'height no puede ser negativo' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'width debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'width no puede ser negativo' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "width", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'depth debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'depth no puede ser negativo' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "depth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'price debe ser un número' }),
    (0, class_validator_1.Min)(0.01, { message: 'price debe ser mayor a 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_product_dto_1.Currency, { message: 'currency debe ser uno de: PYG, USD, EUR' }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'stock debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'stock no puede ser negativo' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'isActive debe ser un booleano' }),
    __metadata("design:type", Boolean)
], UpdateProductDto.prototype, "isActive", void 0);
//# sourceMappingURL=update-product.dto.js.map