import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
export declare class SubcategoriesController {
    private readonly subcategoriesService;
    constructor(subcategoriesService: SubcategoriesService);
    create(dto: CreateSubcategoryDto): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
        };
        products: {
            name: string;
            isActive: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            subcategoryId: string;
            brand: string;
            imageUrl: string | null;
            weight: number | null;
            height: number | null;
            width: number | null;
            depth: number | null;
            price: number;
            currency: import(".prisma/client").$Enums.Currency;
            stock: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        categoryId: string;
    }>;
    findAll(): Promise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
        };
        products: {
            name: string;
            isActive: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            subcategoryId: string;
            brand: string;
            imageUrl: string | null;
            weight: number | null;
            height: number | null;
            width: number | null;
            depth: number | null;
            price: number;
            currency: import(".prisma/client").$Enums.Currency;
            stock: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        categoryId: string;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
        };
        products: {
            name: string;
            isActive: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            subcategoryId: string;
            brand: string;
            imageUrl: string | null;
            weight: number | null;
            height: number | null;
            width: number | null;
            depth: number | null;
            price: number;
            currency: import(".prisma/client").$Enums.Currency;
            stock: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        categoryId: string;
    }>;
    findBySlug(slug: string): Promise<{
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
        };
        products: {
            name: string;
            isActive: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            slug: string;
            subcategoryId: string;
            brand: string;
            imageUrl: string | null;
            weight: number | null;
            height: number | null;
            width: number | null;
            depth: number | null;
            price: number;
            currency: import(".prisma/client").$Enums.Currency;
            stock: number;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        categoryId: string;
    }>;
    update(id: string, dto: UpdateSubcategoryDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        categoryId: string;
    }>;
    updateBySlug(slug: string, dto: UpdateSubcategoryDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        categoryId: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        categoryId: string;
    }>;
    removeBySlug(slug: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        categoryId: string;
    }>;
}
