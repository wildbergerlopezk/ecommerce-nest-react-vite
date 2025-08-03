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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcategoriesController = void 0;
const common_1 = require("@nestjs/common");
const subcategories_service_1 = require("./subcategories.service");
const create_subcategory_dto_1 = require("./dto/create-subcategory.dto");
const update_subcategory_dto_1 = require("./dto/update-subcategory.dto");
let SubcategoriesController = class SubcategoriesController {
    subcategoriesService;
    constructor(subcategoriesService) {
        this.subcategoriesService = subcategoriesService;
    }
    create(dto) {
        return this.subcategoriesService.create(dto);
    }
    findAll() {
        return this.subcategoriesService.findAll();
    }
    findOne(id) {
        return this.subcategoriesService.findOne(id);
    }
    findBySlug(slug) {
        return this.subcategoriesService.findBySlug(slug);
    }
    update(id, dto) {
        return this.subcategoriesService.update(id, dto);
    }
    updateBySlug(slug, dto) {
        return this.subcategoriesService.updateBySlug(slug, dto);
    }
    remove(id) {
        return this.subcategoriesService.remove(id);
    }
    removeBySlug(slug) {
        return this.subcategoriesService.removeBySlug(slug);
    }
};
exports.SubcategoriesController = SubcategoriesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subcategory_dto_1.CreateSubcategoryDto]),
    __metadata("design:returntype", void 0)
], SubcategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubcategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubcategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubcategoriesController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_subcategory_dto_1.UpdateSubcategoryDto]),
    __metadata("design:returntype", void 0)
], SubcategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('slug/:slug'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_subcategory_dto_1.UpdateSubcategoryDto]),
    __metadata("design:returntype", void 0)
], SubcategoriesController.prototype, "updateBySlug", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubcategoriesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('slug/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubcategoriesController.prototype, "removeBySlug", null);
exports.SubcategoriesController = SubcategoriesController = __decorate([
    (0, common_1.Controller)('subcategories'),
    __metadata("design:paramtypes", [subcategories_service_1.SubcategoriesService])
], SubcategoriesController);
//# sourceMappingURL=subcategories.controller.js.map