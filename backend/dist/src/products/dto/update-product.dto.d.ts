import { Currency } from './create-product.dto';
export declare class UpdateProductDto {
    subcategoryId?: string;
    imageUrl?: string;
    subcategorySlug?: string;
    name?: string;
    description?: string;
    brand?: string;
    weight?: number;
    height?: number;
    width?: number;
    depth?: number;
    price?: number;
    currency?: Currency;
    stock?: number;
    isActive?: boolean;
}
