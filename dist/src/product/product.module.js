"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const category_service_1 = require("../category/category.service");
const pagination_service_1 = require("./../pagination/pagination.service");
const prisma_service_1 = require("../prisma.service");
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const category_module_1 = require("../category/category.module");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_controller_1.ProductController],
        imports: [category_module_1.CategoryModule],
        providers: [
            product_service_1.ProductService,
            prisma_service_1.PrismaService,
            pagination_service_1.PaginationService,
            category_service_1.CategoryService,
        ],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map