import { PrismaService } from 'prisma/prisma.service';
export declare class SearchService {
    private prisma;
    constructor(prisma: PrismaService);
    searchByName(model: string, name: string): Promise<any>;
}
