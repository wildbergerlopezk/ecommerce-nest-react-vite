import { PrismaService } from 'prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCartItemDto: CreateCartDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        userId: string;
    }>;
    getCartItems(userId: string): Promise<({
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
    removeFromCart(cartItemId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        quantity: number;
        userId: string;
    }>;
}
