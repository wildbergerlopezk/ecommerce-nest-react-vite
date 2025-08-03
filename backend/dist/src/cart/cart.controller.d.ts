import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addItem(dto: CreateCartDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        userId: string;
    }>;
    findAll(userId: string): Promise<({
        product: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        userId: string;
    })[]>;
    updateQuantity(cartItemId: string, dto: UpdateCartDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        userId: string;
    }>;
    remove(cartItemId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        userId: string;
    }>;
}
