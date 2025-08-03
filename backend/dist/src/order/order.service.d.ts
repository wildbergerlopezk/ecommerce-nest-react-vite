import { PrismaService } from 'prisma/prisma.service';
import { OrderStatus } from '@prisma/client';
export declare class OrderService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrderFromCart(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: import(".prisma/client").$Enums.Currency;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
    }>;
    getUserOrders(userId: string): Promise<({
        orderItems: ({
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
            productId: string;
            quantity: number;
            orderId: string;
            unitPrice: number;
        })[];
        Payment: {
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: string;
            amount: number;
            method: import(".prisma/client").$Enums.PaymentMethod;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: import(".prisma/client").$Enums.Currency;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
    })[]>;
    getOrderById(orderId: string, userId: string): Promise<{
        orderItems: ({
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
            productId: string;
            quantity: number;
            orderId: string;
            unitPrice: number;
        })[];
        Payment: {
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: string;
            amount: number;
            method: import(".prisma/client").$Enums.PaymentMethod;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: import(".prisma/client").$Enums.Currency;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
    }>;
    updateOrderStatus(orderId: string, status: OrderStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: import(".prisma/client").$Enums.Currency;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
    }>;
}
