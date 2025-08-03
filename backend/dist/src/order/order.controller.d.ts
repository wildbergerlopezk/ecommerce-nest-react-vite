import { OrderService } from './order.service';
import { OrderStatus } from '@prisma/client';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: import(".prisma/client").$Enums.Currency;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
    }>;
    getOrders(userId: string): Promise<({
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
    getOrder(id: string, userId: string): Promise<{
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
    updateStatus(body: {
        orderId?: string;
        status?: OrderStatus;
    }, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        currency: import(".prisma/client").$Enums.Currency;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
    }>;
}
