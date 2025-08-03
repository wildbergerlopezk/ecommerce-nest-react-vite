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
exports.CreateProductDto = exports.Currency = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var Currency;
(function (Currency) {
    Currency["PYG"] = "PYG";
    Currency["USD"] = "USD";
    Currency["EUR"] = "EUR";
})(Currency || (exports.Currency = Currency = {}));
class CreateProductDto {
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
    currency = Currency.PYG;
    stock = 0;
    isActive = true;
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'subcategoryId debe ser un UUID válido' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "subcategoryId", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'imageUrl debe ser una URL válida' }),
    (0, class_validator_1.MaxLength)(500, { message: 'imageUrl no debe superar los 500 caracteres' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'subcategorySlug debe ser una cadena' }),
    (0, class_validator_1.MaxLength)(100, { message: 'subcategorySlug no debe superar los 100 caracteres' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "subcategorySlug", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'name debe ser una cadena' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'name es obligatorio' }),
    (0, class_validator_1.MaxLength)(255, { message: 'name no debe superar los 100 caracteres' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'description debe ser una cadena' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500, { message: 'description no debe superar los 500 caracteres' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'brand debe ser una cadena' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'brand es obligatorio' }),
    (0, class_validator_1.MaxLength)(50, { message: 'brand no debe superar los 50 caracteres' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'weight debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'weight no puede ser negativo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'height debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'height no puede ser negativo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'width debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'width no puede ser negativo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "width", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'depth debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'depth no puede ser negativo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "depth", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'price debe ser un número' }),
    (0, class_validator_1.Min)(0.01, { message: 'price debe ser mayor a 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Currency, { message: 'currency debe ser uno de: PYG, USD, EUR' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'stock debe ser un número' }),
    (0, class_validator_1.Min)(0, { message: 'stock no puede ser negativo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'isActive debe ser un booleano' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-product.dto.js.map