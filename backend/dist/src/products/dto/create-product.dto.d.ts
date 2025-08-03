export declare enum Currency {
    PYG = "PYG",
    USD = "USD",
    EUR = "EUR"
}
export declare class CreateProductDto {
    subcategoryId?: string;
    imageUrl?: string;
    subcategorySlug?: string;
    name: string;
    description?: string;
    brand: string;
    weight?: number;
    height?: number;
    width?: number;
    depth?: number;
    price: number;
    currency?: Currency;
    stock?: number;
    isActive?: boolean;
}
